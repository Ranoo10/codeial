const Post=require('../models/post');
const User=require('../models/user');


module.exports.home=async function(req,res){


      //populate the user of each post
      try{
        const posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
          path:'comments',
          populate:{
              path:'user',
          }
        })
        .exec();
        const users=await User.find({});

        console.log(req.cookies);
        return res.render('home',{
            title: "Codeial | Home",
                      posts: posts,
                      all_users: users,
                  });
              }
              catch(err){
                  console.error('Error in fetching posts', err);
                  return res.redirect('back');
              };
        }