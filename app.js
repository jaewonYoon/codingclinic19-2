const path= require('path');
const express = require('express');
const app = express();
const db = require('./util/database');
require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', 'views');
const logger = require('morgan');
app.use(logger('dev'));
const bodyParser = require('body-parser');
app.set(bodyParser, {extended: false});
app.use(express.static(path.join(__dirname,'public')));

// router 가져오기 
const mainRoutes = require('./routes/main'); 
const userRoutes = require('./routes/user');

db.execute('SELECT * FROM user')
    .then((data,data2) => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

app.use('/', mainRoutes);
app.use('/user', userRoutes);

const errorController = require('./controllers/error');
const userController = require('./controllers/user');

app.use('/', errorController.get404);
const port_num = process.env.PORT_NUM || 4000;
app.listen(port_num, () => {
    console.log(`server is running at ${process.env.PORT_NUM || 4000}`)
});
