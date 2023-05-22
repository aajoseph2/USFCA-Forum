const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    res.redirect('/');
  });
});

module.exports = router;