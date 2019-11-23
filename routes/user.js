const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//user/signIn => GET
router.get('/signIn', userController.getSignIn); 
//user/signIn => POST
router.post('/signIn', userController.postSignIn);
// user/signOut => GET 
router.get('/signOut', userController.getSignOut); 
// user/signUp => GET
router.get('/signUp', userController.getSignUp); 
// user/signUp => POST
router.post('/signUp', userController.postSignUp);
// user/mypage => GET
router.get('/mypage', userController.getMyPage);
// user/mypage => POST
router.post('/mypage/changeImage', userController.postMyImage);
router.post('/mypage/changePassword', userController.postMyPassword);

// user/apply => GET
router.get('/apply', userController.getApply);
// user/apply2 => GET
router.get('/apply2', userController.getApply);
// user/apply => POST
router.post('/apply',userController.postApply);
// user/apply2 => POST
router.post('/apply2',userController.postApply2);

// user/process => GET
router.get('/process', userController.getProcess);
// user/process => POST
router.post('/porcess',userController.postProcess); 

module.exports = router;
