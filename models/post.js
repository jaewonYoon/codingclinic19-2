const db = require('../util/database');

module.exports = class Post{
    static getPosts(limit, start){
      return db.db.execute(`
      SELECT 
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

}
