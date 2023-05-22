const express = require('express');
const router = express.Router();
const config = require('../../modules/config');

router.get('/', function(req, res) {
    res.render('home', {
        title: 'Home',
        app_name: config.app_name,
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString()
    });
});

module.exports = router;
