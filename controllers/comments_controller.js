const Comment=require('../models/comment');
const Post=require('../models/post')

module.exports.create= async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            });

            post.comments.push(comment);
            post.save();

            if(req.xhr){
                //to fetch user id
                //comment = await comment.populate('user','name').execPopulate();
    
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    messsage:'Post created!',
                });
           }

           req.flash('success','Comment Published');

           res.redirect('/');
        }
    }catch(err){
        console.log(err);
        req.flash('error',err);
        return;
    };
}
    
   
   

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(!comment){
            return res.status(404).json({ error: "Comment not found"});
        }
        if(comment.user.toString()!==req.user.id.toString()){
            return res.status(403).json({ error: "Unauthorized"});
        }

        const postId = comment.post;

        
        await comment.deleteOne();

        await Post.findByIdAndUpdate(postId,{ $pull: { comments: req.params.id } });
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id: req.params.id
                    },
                    messsage: "Comment Deleted"
                });
            }
            req.flash('success','Comment deleted');
            return res.redirect('back');
        }
        catch(err){
        req.flash('error','Internal Server error');
        return res.status(500).json({ error: "Internal Server error"});
    }
}

    
   