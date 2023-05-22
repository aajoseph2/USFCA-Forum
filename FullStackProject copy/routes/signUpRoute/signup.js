const express = require('express');
const router = express.Router();
const User = require('../../models/user.js'); 
const config = require('../../modules/config');

// GET route handler for displaying the signup form
router.get('/signup', function(req, res) {
    res.render('signup', {
        title: 'Sign Up',
        app_name: config.app_name,
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString()
    });
});

// POST route handler for processing the signup form
router.post('/signup', function(req, res) {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,  // In real life I would consider hashing the password
  });

  newUser.save()
    .then(() => res.redirect('/forum'))
    .catch(err => console.log(err));
});

module.exports = router;
