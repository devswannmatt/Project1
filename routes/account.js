const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const { User } = require('../models');

router.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { title: 'Account Management' });
});

router.post('/account', ensureAuthenticated, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    await User.findByIdAndUpdate(req.user._id, { firstName, lastName, email });
    res.redirect('/account');
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
