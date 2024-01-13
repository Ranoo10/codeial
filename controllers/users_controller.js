const User=require('../models/user');


    module.exports.profile=function(req,res){
        return res.render('user_profile',{
            title:"profile",
        })
        
    };


//render sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial|Sign Up"
    });
}


//render sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
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



//create session for user using passport
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession= function(req,res){
    req.logout(function(err) {
        if (err) {
            console.log('Error during logout:', err);
        }
    return res.redirect('/');
    });

}
      

    
