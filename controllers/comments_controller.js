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

module.exports.destroy=function(req,res){
    console.log('Commend id',req.params.id);
    Comment.findById(req.params.id)
    
    .then(comment=>{
        
        if(!comment){
            console.log('Comment not found');
             return res.redirect('back');
        }
    
        if(comment.user!=req.user.id){
            console.log('User is not the owner of comment');
            return res.redirect('back')
        }
            let postId=comment.post;

              comment.deleteOne()
              .then(()=>{
                console.log('Comment deleted successfully');
                return Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
              })
              .then(()=>{
                console.log('Post updated successfully');
                 res.redirect('back');
              })
              .catch(err=>{
                console.error('Error in deleting comment',err);
                res.redirect('back');
              });
            })
            .catch(err=>{
                console.error('Error in finding comment',err);
                 res.redirect('back');
            });
        }