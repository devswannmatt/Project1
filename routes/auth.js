const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const { User } = require('../models');

router.get('/register', (req, res) => {
  var error = ''
  if (res.locals.error[0] !== undefined && res.locals.error[0].msg !== undefined) error = res.locals.error[0].msg
  res.render('register', { title: 'Register', error: error })
});

router.get('/login', (req, res) => {
  try {
    console.log('res.locals.error', res.locals.error)
    // var error = ''
    // if (res.locals.error[0] !== undefined && res.locals.error[0].msg !== undefined) error = res.locals.error[0].msg
    res.render('login', { title: 'Login', error: res.locals.error })
  } catch (error) {
    res.send(error)
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (error) {
    req.flash('error', { log: `${error}`, msg: `${error}`});
    res.redirect('/register');
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    console.log('info', info)
    if (!user) {
      req.flash('error', { log: `User (${req.body.username}) login failure: ${info.message}`, msg: `Username or password incorrect, please try again...`});
      req.flash('error', { log: `User (${req.body.username}) login failure: ${info.message}`, msg: `Username or password incorrect, please try again...`});
      req.flash('error', { log: `User (${req.body.username}) login failure: ${info.message}`, msg: `Username or password incorrect, please try again...`});
      req.flash('error', { log: `User (${req.body.username}) login failure: ${info.message}`, msg: `Username or password incorrect, please try again...`});
      req.flash('error', { log: `User (${req.body.username}) login failure: ${info.message}`, msg: `Username or password incorrect, please try again...`});
      req.flash('error', { log: `User (${req.body.username}) login failure: ${info.message}`, msg: `Username or password incorrect, please try again...`});
      req.flash('error', { log: `User (${req.body.username}) login failure: ${info.message}`, msg: `Username or password incorrect, please try again...`});
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) return next(err)
      req.flash('success', `Welcome back, ${req.user.username}!`);
      return res.redirect('/');
    });
  })(req, res, next)
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'You have been logged out successfully.');
    res.redirect('/login');
  });
});

module.exports = router;
