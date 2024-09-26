const express  = require('express');
const router   = express.Router();
const WFRPSources = require('../../models/wfrp/wfrpSources');

router.get('/wfrp/sources', async (req, res) => {
  try {
    const items = await WFRPSources.find();
    res.send(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;