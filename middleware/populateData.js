const GameSystem = require('../models/gameSystem');
const Template = require('../models/template');
const Page = require('../models/page');
const WFRPItem = require('../models/wfrp/wfrpItem');
const File = require('../models/image');
const WarmasterUnit = require('../models/warmaster/warmasterUnit');
const WarmasterArmy = require('../models/warmaster/warmasterArmy');
const TerrainType   = require('../models/warmaster/warmasterTerrainType');
const Operative     = require('../models/killteam/operative');
const WeaponRule    = require('../models/killteam/rules');

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
      case 'killteam':
        await loadKillteamData(res.locals);
        break;
      default:
        if (data) console.warn(`No data loader found for type: "${data}"`);
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

// Load Killteam
async function loadKillteamData(resLocals) {
  console.log('loading kill teams')
  try {
     // Retrieve all weapon rules to create a lookup table
     const weaponRules = await WeaponRule.find();

     // Create a list of rule name patterns for flexible matching
     const rulePatterns = weaponRules.map(rule => {
       // Convert " x" to a pattern that matches any number with optional characters (e.g., quotes)
       const pattern = rule.name.replace(/ x\+?$/, ' (\\d+\\+?\\s?["\']?)');
       return { pattern: new RegExp(`^${pattern}$`), description: rule.description };
     });
 
     // Retrieve all operatives and convert to plain JavaScript objects
     const operatives = await Operative.find().lean();
 
     // Function to replace 'x' in tooltips with the actual value from rule names
     const replaceTooltip = (ruleName) => {
       // Attempt to match the rule name using the patterns
       const matchingRule = rulePatterns.find(rule => rule.pattern.test(ruleName));
       if (matchingRule) {
         // Extract the value from the rule name, e.g., "Lethal 5+"
         const valueMatch = ruleName.match(/\d+\+?\s?["\']?/);
         const value = valueMatch ? valueMatch[0] : '';
         // Replace 'x' in the tooltip with the extracted value
         return { name: ruleName, tooltip: matchingRule.description.replace('x', value) };
       }
       return { name: ruleName, tooltip: undefined }; // Use undefined for unmatched tooltips
     };
 
     // Process each operative's weapons and rules
     operatives.forEach(operative => {
       // Transform weapon rules
       operative.weapons.forEach(weapon => {
         if (weapon.wr) {
           weapon.wr = weapon.wr.split(',').map(ruleName => {
             ruleName = ruleName.trim();
             return replaceTooltip(ruleName);
           });
         }
       });
 
       // Transform operative rules
       operative.rules.forEach(rule => {
         if (rule.name) {
           rule.tooltip = replaceTooltip(rule.name).tooltip;
         }
       });
     });
 

    console.log('Retrieved Operatives:', operatives);
    resLocals.killteam = {
      operatives: operatives
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
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
