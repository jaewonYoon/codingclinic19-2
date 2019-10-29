const express = require('express');

const postController = require('../controllers/post');

const router = express.Router(); 

// post/timeline => GET
router.get('/timeline', postController.getTimeline);
// post/timeline/getpost =>
router.post('/timeline/getposts', postController.getPosts);

module.exports =router;