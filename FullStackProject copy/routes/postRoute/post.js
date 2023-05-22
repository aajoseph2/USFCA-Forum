const express = require('express');
const router = express.Router();
const loggedIn = require('../../routes/middleware.js');
const config = require('../../modules/config');

router.post('/newpost', loggedIn, function(req, res) {
  const { username, title, body } = req.body;

  if (!title || !body) {
    return res.status(400).send('Both title and body are required');
  }

  const newPost = new Post({
    title,
    body,
    author: req.session.userId,
  });

  newPost.save()
    .then(() => res.redirect('/forum'))
    .catch(err => console.log(err));
});


module.exports = router;
