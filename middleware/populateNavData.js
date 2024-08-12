const GameSystem = require('../models/gameSystem');
const Page = require('../models/page');

async function populateNavData(req, res, next) {
  try {
    const gameSystems = await GameSystem.find();
    const pages = await Page.find();

    // Group pages by category
    const categorizedPages = {};
    gameSystems.forEach(gs => {
      categorizedPages[gs.name] = pages.filter(page => page.category === gs.name);
    });

    // Attach the data to res.locals
    res.locals.gameSystems = gameSystems;
    res.locals.categorizedPages = categorizedPages;
    
    next();
  } catch (err) {
    console.error('Error populating navigation data:', err);
    res.locals.gameSystems = [];
    res.locals.categorizedPages = {};
    next(); // Proceed even if there's an error, with empty data
  }
}

module.exports = populateNavData;
