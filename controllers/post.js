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
    Post.getPosts(limit,start)
        .then(([rows,data]) => {
            
                let new_item = []; 
                rows.forEach((item) => {
                    new_item.push( 
                    Post.checkLikePost(item.postId, req.session.userId)
                    .then(([row,dataField]) => {
                        if(row.length){
                            item.alreadyLiked = 1
                        }
                        return item; 
                    }));
                });
                Promise.all(new_item)
                    .then((item) => {
                        console.log('==========>',item)
                        buildData = build.timeline(item); 
                        return buildData;
                    })
                    .then(data => res.send(data))
                    .catch(err=> console.error(err));
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
    console.log('req.body => ', req.body);
    let image = null;
    console.log(req.file); 
    if(req.file) image = req.file.filename; 
    const userId = req.session.userId;
    const posts = req.body.posts;
    console.log('image:',image);
    Post.writePost(userId,image, posts, 'write')
        .then(res.send('success'))
        .catch(err => console.error(err));
    

}

exports.likePost = (req,res,next) => {
    userId = req.session.userId; 
    postId = req.body.postId;
    type =req.body.type
    if(type === 'add'){
        Post.checkLikePost(postId,userId)
        .then(([rows,dataField]) => {
            if(!rows.length){
                Post.likePost(postId,userId)
                    .then(() => {
                        Post.editLikeCount(postId,type)
                            .then(([rows,dataField]) => {
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
                        res.send(rows.likes_counts);
                    })
            })
            .catch(error=> console.error(error));
    }
    console.log('done');
}
