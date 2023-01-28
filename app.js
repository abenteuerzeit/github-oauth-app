/* 
 * Package Imports
*/
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require('passport-github2').Strategy;

const path = require("path");
require("dotenv").config();
const express = require('express');
const partials = require('express-partials');


const app = express();


/*
 * Variable Declarations
*/

const PORT = 3000;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const GITHUB_AUTH_CALLBACK_URL = process.env.GITHUB_AUTH_CALLBACK_URL;

/*
 * Passport Configurations
*/
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_AUTH_CALLBACK_URL,
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


/*
 *  Express Project Setup
*/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


/*
 * Routes
*/

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
})

app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/github', passport.authenticate(
  'github', {
    scope: ['user'],
    failureRedirect: '/login',
    failureMessage: true,
    successRedirect: '/'
  })
);


/*
 * Listener
*/

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/*
 * ensureAuthenticated Callback Function
*/
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/login')
}
