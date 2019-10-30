const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

//  => GET 
router.get('/',mainController.getIndex);
// info => GET
router.get('/info',mainController.getInfo);


module.exports = router;