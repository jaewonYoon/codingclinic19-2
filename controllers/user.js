const bcrypt = require('../util/bcrypt');
const User = require('../models/user');

//signIn 
exports.getSignIn = (req,res,next) => {
    if(req.session.userId){
        res.redirect('/'); 
    }
    res.render('user/signIn',{
        session: req.session.userId    
    });
}
exports.postSignIn = (req,res,next) => {
    const userId = req.body.id;
    const password = req.body.password; 
    User.fetchUser(userId)
        .then(([rows,fieldData]) => {
           if(bcrypt.checkPassword(password, rows[0].password)){
                console.log('로그인 성공')
                req.session.userId = rows[0].userId;
                req.session.nick = rows[0].nickname;
                req.session.save( () => {
                    res.send('login');
                }); 
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

// 로그아웃
exports.getSignOut = (req,res,next) => {
    let userId;
    if(req.session){
        userId  = req.session.userId;        
    }
    if(!userId){
        res.redirect('/'); 
        return false; 
    }

    try{
        delete req.session.userId;
        req.session.save(() => {
            res.redirect('/');
        })
    } catch(err){
        console.err(err); 
    }
}

// 회원가입 페이지
exports.getSignUp = (req,res,next) => {
    let userId;
    if(req.session){
        userId  = req.session.userId;        
    }
    if(userId){
        res.redirect('/'); 
        return false;
    }
    res.render('user/signUp');
}
// 회원가입 
exports.postSignUp = (req,res,next) => {
    const {id, password, email, nick} = req.body; 
    User.fetchUser(id).
        then((rows,fieldData) => {
            if(rows[0].length){
                res.send('duplicate')
            }
        });
    User.fetchNick(nick).
        then(([rows,fieldData]) => {
            console.log(rows[0].count)
            if(rows[0].count){
                res.send('duplicate_nick');
            }
        })
        .catch( error => console.error(error)); 
    User.createUser(id,bcrypt.makePassword(password),email,nick)
        .then(() => {
            res.send("thankyou");
        })
}

exports.getMyPage = (req,res,next) => {
    res.render('user/myPage',{
        session: req.session
    });
}