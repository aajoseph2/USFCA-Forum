const express = require('express');
const router = express.Router();
const config = require('../../modules/config');
const User = require('../../models/user.js');

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login',
        app_name: config.app_name,
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString()
    });
});

router.post('/login', function(req, res) {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && user.password === req.body.password) {
        req.session.userId = user._id;
        res.redirect('/forum');
      } else {
        res.render('login', {
          error: "Invalid username or password."
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
