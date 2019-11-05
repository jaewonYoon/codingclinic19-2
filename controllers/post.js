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
//timeline.js 에서 포스트 불러올때 post로 가져 옴 
exports.getPosts = (req,res,next) => {
    if(!req.session.userId) {
        res.redirect('/');
        return false;
    }
    let limit = req.body.limit;
    let start = req.body.start;
    // get contents from table posts
    let new_item ='';
    let rows = Post.getPosts(limit,start)
        .then(async ([rows,data]) => {
            return await rows.forEach( (item) => {
                Post.checkLikePost(item.postId, req.session.userId)
                .then(([row,dataField]) => {
                    console.log('row', row);
                    if(row.length){
                       item.alreadyLiked = 1;
                    }
                })
            });
        }).then(rows => {
            console.log( ' +=======================>',rows);
        })
        

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
