const Comment=require('../models/comment');
const Post=require('../models/post')

module.exports.create=function(req,res){
    let foundPost;
   Post.findById(req.body.post)
    .then(post=>{
        if(!post){
            console.error('Post not found');
            return res.redirect('back');
        }

        foundPost=post;
        return Comment.create({
            content:req.body.content,
            post: req.body.post,
            user: req.user._id,
        });
    })
    .then(comment=>{
        foundPost.comments.push(comment);
        return foundPost.save();
    })
    .then(()=>{
        res.redirect('/');
    })  
    .catch(err=>{
        console.error('Error',err);
        res.redirect('back');
    });
        
}