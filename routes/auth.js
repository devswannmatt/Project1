const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const { User } = require('../models');
const flash    = require('connect-flash');

// Register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    req.flash('error', 'Registration failed. Please try again.');
    res.redirect('/register');
  }
});

// Login page
router.get('/login', (req, res) => {
  console.log(req.flash('error'))
  console.log(res.locals.error)
  res.render('login', { title: 'Login', error: res.locals.error });
});

// Handle login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Username or Password incorrect, please try again...'
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'You have been logged out successfully.');
    res.redirect('/login');
  });
});

module.exports = router;
