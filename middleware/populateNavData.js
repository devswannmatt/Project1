const GameSystem = require('../models/gameSystem');
const Template = require('../models/template')
const Page = require('../models/page');
const WFRPItem = require('../models/wfrp/wfrpItem');

async function populateNavData(req, res, next) {
  try {
    const gameSystems   = await GameSystem.find();
    const pageTemplates = await Template.find();
    const pages         = await Page.find();
    const WFRPItems     = await WFRPItem.find().populate('sources.source');

    // Group pages by category
    const categorizedPages = {};
    gameSystems.forEach(gs => {
      categorizedPages[gs.name] = pages.filter(page => page.category && page.category.equals(gs._id));
    });

    // Attach the data to res.locals
    res.locals.gameSystems      = gameSystems;
    res.locals.pageTemplates    = pageTemplates;
    res.locals.categorizedPages = categorizedPages;
    res.locals.wfrpItems        = WFRPItems;
    res.locals.isModal          = req.query.modal

    next();
  } catch (err) {
    console.error('Error populating navigation data:', err);
    res.locals.gameSystems = [];
    res.locals.categorizedPages = {};
    next(); // Proceed even if there's an error, with empty data
  }
}

module.exports = populateNavData;
