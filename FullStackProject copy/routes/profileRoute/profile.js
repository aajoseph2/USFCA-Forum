const express = require('express');
const router = express.Router();
const User = require('../../models/user.js');
const Post = require('../../models/post.js'); 
const config = require('../../modules/config'); 

router.get('/profile', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login');
  }

  // Using Promise.all to wait for both the User and their Posts to be fetched
  Promise.all([
    User.findById(userId),
    Post.find({ author: userId })  // Finding all posts by this user
  ])
    .then(([user, posts]) => {
      if (!user) {
        res.redirect('/login');
      } else {
        // Pass the user, their posts, and some configuration variables to the template
        res.render('profile', { 
          user: user, 
          posts: posts, 
          title: 'Profile',
          app_name: config.app_name,
          current_date: new Date().toLocaleDateString(),
          current_time: new Date().toLocaleTimeString() 
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});


router.post('/posts/delete/:id', (req, res) => {
  const postId = req.params.id;

  // Make sure the user is logged in
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }

  Post.findOneAndDelete({ _id: postId, author: userId })
    .then(result => {
      if (result) {
        res.redirect('/profile');
      } else {
        res.status(404).send('Post not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

router.post('/deleteaccount', (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.redirect('/login');
  }

  // Delete the user's account
  User.findByIdAndDelete(userId)
    .then(result => {
      // deleting the posts as well
      return Post.deleteMany({ author: userId });
    })
    .then(() => {
      // Log the user out by clearing the session
      req.session.userId = null;
      // Redirect to home page
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});


module.exports = router;
