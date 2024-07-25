const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const { User, Role, Log } = require('../models');

router.get('/users', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const users = await User.find().select('firstName lastName email role');
    const roles = await Role.find();
    res.render('users', { title: 'Registered Users', users, roles });
  } catch (error) {
    console.error('Error fetching users or roles:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/users/role', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    user.role = role;
    await user.save();

    const log = new Log({ message: `User role updated: ${user.username} is now ${role}` });
    await log.save();

    res.redirect('/users');
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
