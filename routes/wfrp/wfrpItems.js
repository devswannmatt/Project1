const express  = require('express');
const router   = express.Router();
const WFRPItem = require('../../models/wfrp/wfrpItem');

router.get('/api/wfrp/items', async (req, res) => {
  try {
    const items = await WFRPItem.find().populate('sources.source')
    res.send(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/wfrp/items', async (req, res) => {
  try {
    const items = await WFRPItem.find().populate('sources.source')
    res.render('index', { title: 'Home', items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;