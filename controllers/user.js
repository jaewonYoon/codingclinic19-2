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
                res.send('wrongpd');
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

exports.getApply = (req,res,next) => {
    User.getProcess(req.session.userId)
        .then(([rows,dataField]) => {
            const processRow = rows[0];
            if(processRow ===undefined){
                res.render('user/apply');
            }
            else if(processRow.process === 2){
                res.render('user/process')
                return ;
            }      
            else if( processRow.process === 1){
                console.log(processRow.process);
                res.render('user/apply2');
            }
            
            
        })
        .catch(error => {
            console.error(error)
        })
    
}
exports.postApply = (req,res,next) => {
    const {age, height, weight, kcal, bmr, gender, activity,process} = req.body; 
    const userId = req.session.userId; 
    User.fetchGoal(userId, age,height, weight, kcal, bmr, gender, activity,process)
        .then(([rows,dataArray]) => {
            console.log(rows);
            res.send('success'); 
        })
}

exports.postApply2 = (req,res,next) => {
    console.log(req.body); 
    const userId=req.session.userId; 
    const {goalWeight, goalFatRate, period} = req.body; 
    User.applyGoal(userId,goalWeight, goalFatRate, period,2)
        .then(() => {
            res.send('success');
        })
        .catch((error) => {
            console.error(error);
        });
}

exports.getProcess = (req,res,next) => {
    res.render('user/process');
}

exports.postProcess = (req,res,next) => {
    
}