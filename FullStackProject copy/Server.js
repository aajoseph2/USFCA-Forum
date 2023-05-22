const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./modules/config');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/user.js');
const Post = require('./models/post.js');


const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: [
        path.join(__dirname, 'views', 'partials'),
    ],
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

mongoose.connect(config.mongo.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const profileRoutes = require('./routes/profileRoute/profile');
const loginRoutes = require('./routes/loginRoute/login.js');
const contactRoutes = require('./routes/contactRoute/contact.js');
const homeRoutes = require('./routes/homeRoute/home');
const aboutRoutes = require('./routes/aboutRoute/about');
const forumRoutes = require('./routes/forumRoute/forum');
const signupRoutes = require('./routes/signupRoute/signup');
const postRoutes = require('./routes/postRoute/post');
const logoutRoutes = require('./routes/logoutRoute/logout');

app.use(loginRoutes);
app.use(homeRoutes);
app.use(aboutRoutes);
app.use(forumRoutes);
app.use(signupRoutes);
app.use(postRoutes);
app.use(contactRoutes);
app.use(profileRoutes);
app.use(logoutRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.post('/signup', function(req, res) {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,  // In real life I would consider hashing the password
  });

  newUser.save()
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/forum')
    })
    .catch(err => console.log(err));
});

app.post('/login', function(req, res) {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/forum');
    })
    .catch(err => console.log(err));
});



app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(function(req, res, next) {
  res.status(404).send('404 - Page Not Found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

app.listen(config.port, config.host, function() {
  console.log(`Server running on ${config.host}:${config.port}`);
});



