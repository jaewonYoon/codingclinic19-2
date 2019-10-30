const express = require('express');

const postController = require('../controllers/post');

const router = express.Router(); 

// post/timeline => GET
router.get('/timeline', postController.getTimeline);
// post/timeline/getpost => post
router.post('/timeline/getposts', postController.getPosts);
// post/timeline/writepost => post 
router.post('/timeline/writepost', postController.writePost);
// post/timeline/likepost => post   (check like, do like)
router.post('/timeline/likepost', postController.likePost); 


router.post('/board/getposts', postController.likePost)
// post/board => GET
router.get('/board', postController.getBoard);
// post/board/getposts => post
router.post('/board/getposts', postController.getBoardPosts);


module.exports =router;