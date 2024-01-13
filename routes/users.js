const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');


router.get('/profile', passport.checkAuthentication, userController.profile);


router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
//creating session using manual authentication
// router.post('/create-session',userController.createSession);
// router.post('/sign-out',function(req,res){
//     res.clearCookie('user_id');

//     return res.redirect('/users/sign-in');
// });

//creating session using passport
//use passport as a middleware to create session
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userController.createSession);

router.get('/sign-out',userController.destroySession);
module.exports=router;