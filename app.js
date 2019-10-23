const path= require('path');
const express = require('express');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.set(bodyParser, {extended: false});
app.use(express.static(path.join(__dirname,'public')));

// router 가져오기 
const mainRoutes = require('./routes/main'); 
app.use('/',mainRoutes);
const errorController = require('./controllers/error');
app.use('/', errorController.get404);
const port_num = process.env.PORT_NUM || 4000;
app.listen(port_num, () => {
    console.log(`server is running at ${process.env.PORT_NUM || 4000}`)
});
