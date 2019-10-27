const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//user/signIn => GET
router.get('/signIn', userController.getSignIn); 
//user/signIn => POST
router.post('/signIn', userController.postSignIn);
module.exports = router;
// user/signOut => GET 
router.get('/signOut', userController.getSignOut); 
// user/signUp => GET
router.get('/signUp', userController.getSignUp); 
// user/signUp => POST
router.post('/signUp', userController.postSignUp);
// user/mypage => GET
router.get('/mypage', userController.getMyPage);