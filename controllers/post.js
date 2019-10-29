const User = require('../models/user'); 

//timeline
exports.getTimeline = (req,res,next) => {
    if(!req.session.userId){
        res.redirect('/');
        return false; 
    }
    // 사진 가져오기 
    User.fetchImage(req.session.userId)
        .then(([rows,dataField]) => {
            let image; 
            image = rows[0].Image;
            if(!image){
                return '/images/default/profile.jpg'
            } else {
            image = '/images/' +image; 
            console.log(image);
            return image;
            } 
        })
        .then(image => {
            console.log("image", image);
            res.render('post/timeline', {
                userId: req.session.nick,
                image: image 
            });
        })
        .catch(error => {
            console.error(error);
        }); 
        
}