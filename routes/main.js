const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

//main/index => GET 
router.get('/',mainController.getIndex);

module.exports = router;