const User=require('../models/user');


    module.exports.profile=async function(req,res){
        try{
            const userId=req.params.id;
            const user=await User.findById(req.params.id);

            if(!user){
                return res.redirect('back');
            }

            return res.render('user_profile',{
                title:"User Profile",
                profile_user: user,
        });
    }
    catch(err){
        console.log('Error in finding user',err);
        return res.redirect('back');
    } 
};   
       
module.exports.update=async function(req,res){
    try{
        if(req.user.id===req.params.id){
            const updateUser=await User.findByIdAndUpdate(req.params.id, req.body);
              if(!updateUser){
                return res.redirect('back');
            }
            return res.redirect('back');
    }
   

    else{
        return res.status(401).send('Unauthorized');
    }
}catch(err){
    console.error('Error in updating user',err);
    return res.redirect('back');
}
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
    if(req.body.password!==req.body.confirm_password){
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession= function(req,res){
    req.logout(function(err) {
        if (err) {
            console.log('Error during logout:', err);
        }
        req.flash('success','Logged out successfully');
    return res.redirect('/');
    });

}
      

    
