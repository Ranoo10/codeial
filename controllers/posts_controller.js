const Post=require('../models/post');
const Comment=require('../models/comment');


module.exports.create=function(req,res){
    // console.log('Request body', req.body);
    // if (!req.body.content) {
    //     console.error('Error: Content is required for creating a post');
    //     return res.redirect('back');
    //   }
    // if(!req.isAuthenticated()){
    //     return res.redirect('/users/sign-in');
    // }
    Post.create({
        content: req.body.content,
        user: req.user._id,
    })
    .then(post=>{
        req.flash('success','Post published!');
        return res.redirect('back');
    })
    .catch(err=>{
        req.flash('error',err);
        return res.redirect('back');
    });
  

}

module.exports.destroy=function(req,res){
    Post.findById(req.params.id)
    .then(post => {
        if (post && post.user == req.user.id) {
            // Delete associated comments
            return Comment.deleteMany({ post: req.params.id })
                .then(() => {
                    // Delete the post
                    req.flash('success','Post and comments deleted!');
                    return post.deleteOne();
                    
                })
                .then(() => {
                    res.redirect('back');
                })
                .catch(err => {
                    console.error('Error deleting comments:', err);
                    res.redirect('back');
                });
        } else {
            // Post not found or user is not the owner
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }
    })
    .catch(err => {
        req.flash('error',err);
        res.redirect('back');
    });
};