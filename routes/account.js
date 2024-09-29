const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const User = require('../models/user');
const GameSystem = require('../models/gameSystem');

router.get('/account', ensureAuthenticated, async (req, res) => {
  try {
    const gameSystems = await GameSystem.find();
    console.log('Logged in')
    res.render('account', {
      user: req.user,
      title: 'Account Management',
      gameSystems
    });
  } catch (err) {
    console.error(err);
    console.log('Failed to login')

    res.redirect('/');
  }
});

router.post('/account', ensureAuthenticated, async (req, res) => {
  try {
    const { firstName, lastName, email, facebook, gameSystems } = req.body;

    const user = await User.findById(req.user.id);
    user.firstName   = firstName;
    user.lastName    = lastName;
    user.email       = email;
    user.facebook    = facebook;
    user.gameSystems = Array.isArray(gameSystems) ? gameSystems : [gameSystems];
    await user.save();

    res.redirect('/account');
  } catch (error) {
    console.error(error);
    console.log('Failed to login')
    res.redirect('/account');
  }
});

module.exports = router;
