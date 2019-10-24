const bcrypt = require('../util/bcrypt');
const User = require('../models/user');

//signIn 
exports.getSignIn = (req,res,next) => {
    
    res.render('user/signIn');
}
exports.postSignIn = (req,res,next) => {
    const userId = req.body.id;
    const password = req.body.password; 
    User.fetchUser(userId)
        .then(([rows,fieldData]) => {
           if(bcrypt.checkPassword(password, rows[0].password)){
                console.log('로그인 성공')
                // res.render('main/index',{
                //     pageTitle: '힐러',
                //     nickname: rows[0].nickname 
                // });
                res.send('login');
            } else {
                console.log('비밀번호가 틀렸습니다.'); 
                return false;
            }
        })
        .catch( err => {
            console.log(err);
            return false;
        })
    
}