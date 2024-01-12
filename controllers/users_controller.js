const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title: "Codeial|Profile"
    });
}


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
    //     if(err){
    //         console.log('Error in finding user in signing up'); return
    //     }

    //     if(!user){
    //        User.create(req.body,function(err,user){
    //         if(err){
    //             console.log('Error in creating user while signing up'); return
    //         }

    //         return res.redirect('/users/sign-in');
    //        })}
    //        else{
    //           return res.redirect('back');
    //        }
        
    // });

}

//signin the user and create session
module.exports.createSession=function(req,res){
    //to do later
}