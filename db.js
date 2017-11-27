const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'user',
  database: 'posts',
});

const queries = {
  users: `SELECT * FROM users;`,
  addUser: `INSERT INTO users (name, username, email) VALUES(?, ?, ?);`,
  updateUser: `UPDATE users SET name=?, username=?, email=? WHERE id=?;`,
  deleteUser: `DELETE FROM users WHERE id=?;`,
  posts: `SELECT posts.title, posts.body, posts.id, posts.userId FROM posts;`,
  addPost: `INSERT INTO posts (title, body, userId) VALUES(?, ?, ?);`,
  updatePost: `UPDATE posts SET title=?, body=?, userId=? WHERE id=?;`,
  deletePost: `DELETE FROM posts WHERE id=?;`,
}

function getConnection(query, cb, args) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('err ', err)
      connection.release();
      res.json(err);
    }
    connection.query(query, args, function(err, results, fields) {
      connection.release();
      cb(results);
    });
  });
}

module.exports = {
  getUsers(cb) {
    getConnection(queries.users, cb);
  },
  addUser(user, cb) {
    getConnection(queries.addUser, cb, [user.name, user.username, user.email]);
  },
  updateUser(user, cb) {
    getConnection(queries.updateUser, cb, [user.name, user.username, user.email, user.id]);
  },
  deleteUser(userId, cb) {
    getConnection(queries.deleteUser, cb, [userId]);
  },
  getPosts(cb) {
    getConnection(queries.posts, cb);
  },
  addPost(post, cb) {
    getConnection(queries.addPost, cb, [post.title, post.body, post.userId]);
  },
  updatePost(post, cb) {
    getConnection(queries.updatePost, cb, [post.title, post.body, post.userId, post.id]);
  },
  deletePost(postId, cb) {
    getConnection(queries.deletePost, cb, [postId]);
  },
};
