const express  = require('express');
const router   = express.Router();
const WFRPItem = require('../../models/wfrp/wfrpItem');
const File     = require('../../models/image');

router.get('/api/wfrp/items', async (req, res) => {
  try {
    const WFRPItems = await WFRPItem.find().populate('sources.source')
    res.send(WFRPItems);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/wfrp/items', async (req, res) => {
  try {
    var WFRPItems = await WFRPItem.find().populate('sources.source');
    var Files     = await File.find();

    var PDFS = {}

    Files.filter(file => file.filename.endsWith('.pdf')).forEach((file) => {
      PDFS[file.name] = `/uploads/${file.filename}`
    })

    WFRPItems.forEach(item => {
      item.sources.forEach(sourceObj => {
        if (PDFS[sourceObj.source.name]) {
          sourceObj.source.filename = PDFS[sourceObj.source.name];
        }
      });
    });

    res.render('index', { title: 'Home', WFRPItems });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;