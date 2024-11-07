const express = require('express');
const router = express.Router();
const Operative = require('../../models/killteam/operative');

router.get('/api/killteam/operatives', async (req, res) => {
  try {
    const operatives = await Operative.find()
      .populate('weapons')
      .populate('rules')

    console.log('Retrieved Operatives:', operatives);
    res.send({ operatives: operatives });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
