const User = require('../models/user'); 
const Post = require('../models/post');
const build = require('../util/buildtag');

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
            return image;
            } 
        })
        .then(image => {
            res.render('post/timeline', {
                userId: req.session.nick,
                image: image 
            });
        })
        .catch(error => {
            console.error(error);
        }); 
}
exports.getPosts = (req,res,next) => {
    if(!req.session.userId) {
        res.redirect('/');
        return false;
    }
    let limit = req.body.limit;
    let start = req.body.start;
    // get contents from table posts
    Post.getPosts(limit,start)
        .then(([rows,data]) => {
                rows.forEach((item) => {
                Post.checkLikePost(item.postId,req.session.userId)
                    .then(([row, dataField]) => {
                        if(row.length){
                            item.alreadyLiked = 1;
                        }else item.alreadyLiked = 0;
                        console.log('1111111');
                        return item
                    })
                    .then(([row,dataField]) =>{
                        console.log('222222');
                        
                    })
                    .catch((error)=>console.error(error))       
            })
            return rows;
        })
        .then(rows => {
            console.log(rows) 
            rows = build.timeline(rows);
            let buildData = '' 
            rows.forEach((item) => {
                buildData += item;
            });
            res.send(rows.length 
                ? buildData 
                : 'nodata');   
        })
        .catch( error => {
            console.error(error)
        });

}
exports.getBoard = (req,res,next) => {
    res.render('post/board');
}
exports.getBoardPosts = (req,res,next) => {
}
exports.writePost = (req,res,next)=> {

}
exports.likePost = (req,res,next) => {
    userId = req.session.userId; 
    postId = req.body.postId;
    type =req.body.type
    console.log(type);
    if(type === 'add'){
        Post.checkLikePost(postId,userId)
        .then(([rows,dataField]) => {
            if(!rows.length){
                Post.likePost(postId,userId)
                    .then(() => {
                        Post.editLikeCount(postId,type)
                            .then(([rows,dataField]) => {
                                console.log(rows);
                                res.send(rows.likes_counts);
                            })
                    })
            }
        })
        .catch(error => {
            console.error(error);
        })
    } else if(type==='minus'){
        Post.cancelPost(postId,userId)
            .then(()=>{
                Post.editLikeCount(postId,type)
                    .then(([rows,dataField]) => {
                        console.log(rows);
                        res.send(rows.likes_counts);
                    })
            })
            .catch(error=> console.error(error));
    }
    console.log('done');
}
