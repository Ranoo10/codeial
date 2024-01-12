const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
//const postController=require('../controllers/posts_controller');

router.get('/profile',userController.profile);
//router.get('/posts',postController.post);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

module.exports=router;