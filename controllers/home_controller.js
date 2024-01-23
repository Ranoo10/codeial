const Post=require('../models/post');
const User=require('../models/user');


module.exports.home=async function(req,res){

    // console.log(req.cookies);
//     Post.find({})
//     
//     .then(posts=>{
//         console.log(req.cookies);
//         return res.render('home',{
//             title:"Codeial | Home",
//             posts: posts,

//     });
// })
      // .catch(err=>{
      //   console.log('Error in fetching posts',err);
      //   return res.redirect('back');
      // });
      //populate the user of each post
      try{
        const posts=await Post.find({})
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