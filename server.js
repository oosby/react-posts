const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser());
app.use(bodyParser.json());
app.set('view engine', 'pug');

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.render('index');
});

app.route('/api/users')
  .get(function(req, res, next) {
    db.getUsers((results) => { res.json(results); });
  })
  .post(function(req, res, next) {
    const user = req.body.user;
    db.addUser(req.body.user, (results) => {
      user.id = results.insertId;
      res.json(user);
    });
  })
  .put(function(req, res) {
    db.updateUser(req.body.user, (results) => { res.json(results); });
  })
  .delete(function(req, res) {
    db.deleteUser(req.body.id, (results) => { res.json(results); });
  });

app.route('/api/posts')
  .get(function(req, res) {
    db.getPosts((results) => { res.json(results); });
  })
  .post(function(req, res) {
    const post = req.body.post;
    db.addPost(req.body.post, (results) => {
      post.id = results.insertId;
      res.json(post);
    });
  })
  .put(function(req, res) {
    db.updatePost(req.body.post, (results) => { res.json(results); })
  })
  .delete(function(req, res) {
    db.deletePost(req.body.id, (results) => { res.json(results); });
  });

app.listen(3005, function() {
  console.log(`${env} Posts App is listening on 3005`);
})