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

// 파서 , bodyParser 는 text, 멀터는 multipart form 
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file ,cb) => {
        cb(null, 'public/images');
    },
    filename: (req,file,cb) =>{
        cb(null, new Date().toISOString().replace(/:/gi,'-') + file.originalname);
    } 
});

const fileFilter = (req,file, cb) => {
    if(
        file.mimeType==='image/png' || 
        file.mimeType==='image/jpg' || 
        file.mimeType==='image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
// {storage: fileStorage,fileFilter: fileFilter}
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage}).single('image'));

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

