const db = require('../util/database');
module.exports = class Post{
    static getPosts(limit, start){
      return db.db.execute(`
      SELECT 
      post.postId, post.likes_counts,
      post.userId, post.image, post.createdAt,
      post.posts, user.nickname, user.Image
      from posts as post
      join
      user as user 
      on post.userId = user.userId 
      order by postId
      DESC LIMIT ${start}, ${limit}
      `);
    }
  static checkLikePost(postId,userId){
    return db.db.execute(`
      select * from posts_likes 
      where postId='${postId}' and userId = '${userId}'
    `)
  }
  
  static likePost(postId,userId){
    return db.db.execute(`
      INSERT INTO 
      posts_likes(postId, userId, likes)
      values('${postId}','${userId}', 1)
    `)
  }
  static cancelPost(postId, userId){
    return db.db.execute(`
      DELETE FROM posts_likes WHERE postId=${postId} and userId='${userId}'
    `)
  }
  static editLikeCount(postId, type){
    if(type==='add'){
      return db.db.execute(` 
        UPDATE posts set likes_counts = likes_counts+1 
        WHERE postId = ${postId};  
          `)
        .then(()=>{
          return db.db.execute(`SELECT likes_counts from posts where postId=${postId}`);
        })
    } else if(type==='minus'){ 
      return db.db.execute(` 
        UPDATE posts set likes_counts = likes_counts-1 
        WHERE postId = ${postId}`)
        .then(() => {
          return db.db.execute(`SELECT likes_counts from posts where postId=${postId}`);
        })
    }
  }

}
