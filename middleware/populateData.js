const GameSystem = require('../models/gameSystem');
const Template = require('../models/template');
const Page = require('../models/page');
const WFRPItem = require('../models/wfrp/wfrpItem');
const File = require('../models/image');
const WarmasterUnit = require('../models/warmaster/warmasterUnit');
const WarmasterArmy = require('../models/warmaster/warmasterArmy');
const TerrainType = require('../models/warmaster/warmasterTerrainType');

async function populateData(req, res, next) {
  const { data, army, format, modal } = req.query;

  try {
    const gameSystems = await GameSystem.find();
    res.locals = {
      gameSystems,
      pageTemplates: await Template.find(),
      categorizedPages: await categorizedPages(gameSystems),
      pages: await Page.find(),
      isModal: modal,
      user: req.user || null
    };

    // Load specific data based on query
    switch (data) {
      case 'wfrp':
        await loadWFRPData(res.locals);
        break;
      case 'warmaster':
        await loadWarmasterData(res.locals, army, format);
        break;
      default:
        console.warn(`No data loader found for type: "${data}"`);
        break;
    }

    next();
  } catch (err) {
    console.error('Error populating navigation data:', err);
    res.locals.gameSystems = [];
    res.locals.categorizedPages = {};
    next();
  }
}

// Helper function to categorize pages by game system
async function categorizedPages(gameSystems) {
  const pages = await Page.find();
  const categorizedPages = {};

  gameSystems.forEach((gs) => {
    categorizedPages[gs.name] = pages.filter(page => page.category && page.category.equals(gs._id));
  });

  Object.keys(categorizedPages).forEach((category) => {
    categorizedPages[category].forEach((page) => {
      page.query = page.query ? `?${page.query}` : '';
      page.url = `${page._id}${page.query}`;
    });
  });

  return categorizedPages;
}

// Load Warmaster-specific data
async function loadWarmasterData(resLocals, armyName, format) {
  try {
    const warmArmy = await WarmasterArmy.findOne({ name: armyName });
    if (!warmArmy) {
      console.error(`Army with name "${armyName}" not found.`);
      return;
    }
    resLocals.warmArmy = warmArmy;
    resLocals.warmUnits = await getWarmasterUnits(warmArmy, format);
    resLocals.warmTerrain = await TerrainType.find().populate('access.unitType');
  } catch (err) {
    console.error('Error loading Warmaster data:', err);
  }
}

// Load WFRP-specific data
async function loadWFRPData(resLocals) {
  try {
    const WFRPItems = await WFRPItem.find().populate('sources.source');
    const Files = await File.find();

    const PDFs = Files.reduce((acc, file) => {
      if (file.filename.endsWith('.pdf')) acc[file.name] = `/uploads/${file.filename}`;
      return acc;
    }, {});

    WFRPItems.forEach((item) => {
      item.sources.forEach((sourceObj) => {
        if (PDFs[sourceObj.source.name]) {
          sourceObj.source.filename = PDFs[sourceObj.source.name];
        }
      });
    });

    resLocals.wfrpItems = WFRPItems
  } catch (err) {
    console.error('Error loading WFRP data:', err);
    return [];
  }
}

// Get Warmaster units
async function getWarmasterUnits(army, format) {
  return WarmasterUnit.find({ army: army._id })
    .populate({
      path: 'specialRules',
      populate: {
        path: 'chart',
      },
    })
    .populate({
      path: 'type',
      populate: {
        path: 'coreRules',
      },
    })
    .populate('army', 'name')
    .populate('spells');
}

module.exports = populateData;
