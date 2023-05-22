const express = require('express');
const router = express.Router();
const config = require('../../modules/config');
const Post = require('../../models/post.js');

// Middleware to check if the user is logged in
function loggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/newpost', loggedIn, function(req, res) {
    res.render('newpost', {
        title: 'New Post',
        app_name: config.app_name,
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString()
    });
});

router.post('/newpost', loggedIn, function(req, res) {
  const { title, body } = req.body;

  const newPost = new Post({
    title,
    body,
    author: req.session.userId,
  });

  newPost.save()
    .then(() => res.redirect('/forum'))
    .catch(err => console.log(err));
});

router.get('/forum', loggedIn, function(req, res) {
  Post.find({})
    .populate('author', 'username')
    .then(posts => {
      posts = posts.length > 0 ? posts : null; // Set posts to null if it's an empty array
      res.render('forum', { 
        posts: posts, 
        app_name: config.app_name,
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString() 
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
