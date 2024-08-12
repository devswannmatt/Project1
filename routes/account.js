const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const User = require('../models/user');
const GameSystem = require('../models/gameSystem');

// Account page route
router.get('/account', ensureAuthenticated, async (req, res) => {
  try {
    const gameSystems = await GameSystem.find();
    res.render('account', {
      user: req.user,  // Pass the current user to the template
      title: 'Account Management',
      gameSystems  // Pass the game systems to the template
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading game systems');
    res.redirect('/');
  }
});

// Update account details
router.post('/account', ensureAuthenticated, async (req, res) => {
  try {
    const { firstName, lastName, email, facebook, gameSystems } = req.body;

    const user = await User.findById(req.user.id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.facebook = facebook;
    user.gameSystems = Array.isArray(gameSystems) ? gameSystems : [gameSystems]; // Store as array
    await user.save();

    req.flash('success_msg', 'Account updated successfully');
    res.redirect('/account');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error updating account');
    res.redirect('/account');
  }
});

module.exports = router;
