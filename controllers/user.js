const bcrypt = require('../util/bcrypt');
const split = require( '../util/split');
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
// /user/mypage => get
exports.getMyPage = (req,res,next) => {
    var image;
    if(!req.session.userId){
        res.redirect('/');
    } else{ 
        User.fetchImage(req.session.userId)
            .then(([rows,dataField]) => {
                if(rows[0].Image){
                    image = rows[0].Image;
                    image = '/images/'+ image;
                    // image = split.transUrl('publicimages', image, '/images/');
                    // image = image.replace('publicimages','/images/')
                    res.render('user/myPage',{
                        session: req.session,
                        image :image
                    });
                }else{
                    res.render('user/myPage',{
                        session:req.session,
                        image: `/images/default/profile.jpg` 
                    })
                }
                
            })
       
    }
    
}
// /user/mypage/changeImage => post 
exports.postMyImage = (req,res,next) => { 
    const image= req.file; 
    if(!image){
        res.send('type_error'); 
    }
    // const imageUrl = split.transUrl('publicimages', image.path, '/images');

    User.createImage(req.session.userId, image.filename)
        .then(() => {
            User.fetchImage(req.session.userId)
            .then(([rows,dataField]) => {
                let url = rows[0].Image;
                res.send(url);
            })
        })
        .catch((err) => console.error(err)); 
}

exports.postMyPassword = (req,res,next) => {
    res.send('success');
}