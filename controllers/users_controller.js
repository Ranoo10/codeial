const User=require('../models/user');


    module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then(user => {
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }

            return res.redirect('/users/sign-in');
        })
        .catch(err => {
            console.log('Error in fetching user profile:', err);
            return res.redirect('/error-page');
        });
} else {
    return res.redirect('/users/sign-in');
}
};


//render sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial|Sign Up"
    });
}


//render sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial|Sign In"
    });
}


//get the sign-up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email})
    .then(user =>{
        if(user){
            return res.redirect('back');
        }
        else{
            return User.create(req.body);
        }
    })
    .then(user =>{
        return res.redirect('/users/sign-in');
    })
    .catch(err =>{
        console.log('Error in signing up:', err);
        return res.redirect('back');
    });
   
}

//signin the user and create session
module.exports.createSession=function(req,res){
    //find the user
   User.findOne({email:req.body.email})
      .then(user=>{
        //handle user found
        if(!user)
        return res.redirect('back');
      
     
    
    
       //handle mismatching of passwords
       if(user.password!==req.body.password){
        return res.redirect('back');
       }

      //handle sesssion creation 
       res.cookie('user_id',user.id)
       return res.redirect('/users/profile');
    })
    .catch(err=>{
        console.log('Error in signing in',err);
        return res.redirect('back');
    });
   
}
      

    
