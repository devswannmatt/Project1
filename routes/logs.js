const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const { Log } = require('../models');

router.get('/logs', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const logs = await Log.Log.find().sort({ timestamp: -1 });
    res.render('logs', { title: 'Logs', logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
