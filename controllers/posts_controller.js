const Post=require('../models/post');


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
        console.log('Post created',post);
        return res.redirect('back');
    })
    .catch(err=>{
        console.log('Error in creating post',err);
        return res.redirect('back');
    });
  

}