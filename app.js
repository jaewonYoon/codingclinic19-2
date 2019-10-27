const path= require('path');
const express = require('express');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const app = express();
const db = require('./util/database');
require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', 'views');
const logger = require('morgan');
app.use(logger('dev'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
// 세션 암호화 값 설정 
app.use(session({
    secret:"healer-maker",
    resave: false,
    saveUninitialized: true,
    store : new mysqlStore(db.config)   
}));
// router 가져오기 
const mainRoutes = require('./routes/main'); 
const userRoutes = require('./routes/user');

app.use('/', mainRoutes);
app.use('/user', userRoutes);

const errorController = require('./controllers/error');
app.use('/', errorController.get404);

const port_num = process.env.PORT || 4000;
app.listen(port_num, () => {
    console.log(`server is running at ${process.env.PORT || 4000}`)
});

