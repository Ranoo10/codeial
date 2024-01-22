const Post=require('../models/post');

module.exports.home=function(req,res){

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
      Post.find({}).populate('user').exec()
      .then(posts => {
        console.log(req.cookies);
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
        });
    })
    .catch(err => {
        console.log('Error in fetching posts', err);
        return res.redirect('back');
    });
}