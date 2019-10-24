const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//user/login => GET
router.get('/signIn', userController.getSignIn); 
//user/login => POST
router.post('/signIn', userController.postSignIn);
module.exports = router;