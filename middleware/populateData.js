// const { GameSystem, Template, Page, File } = require('../models')
// const { WFRPItem } = require('../models/wfrp')

const GameSystem    = require('../models/gameSystem');
const Template      = require('../models/template')
const Page          = require('../models/page');
const WFRPItem      = require('../models/wfrp/wfrpItem');
const File          = require('../models/image');
const WarmasterUnit = require('../models/warmaster/warmasterUnit');

async function populateData(req, res, next) {
  let query = getQueryParams(`${req.protocol}://${req.get('host')}${req.originalUrl}`, 'data')
  try {
    const gameSystems = await GameSystem.find();
    
    res.locals.gameSystems      = gameSystems;
    res.locals.pageTemplates    = await Template.find();
    res.locals.categorizedPages = await categorizedPages(gameSystems);
    res.locals.pages            = await Page.find();
    res.locals.isModal          = req.query.modal
    res.locals.user             = req.user || null;

    switch (query.data) {
      case 'wfrp': {
        res.locals.wfrpItems = await getWFRPData(query.data);
      }
        
      case 'warmaster': {
        res.locals.warmUnits = await getWarmasterUnits(query.data);
        // res.locals.warmUnits.forEach((unit) => {
        //   unit.tooltip = 'Access: ' + unit.type.access.map(obj => obj.name).join(', ')
        //   if (unit.type.name.includes('(Flying)')) unit.tooltip += '<br /> Bypass: All' 
        // })
      }
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
  gameSystems.forEach(gs => {
    categorizedPages[gs.name] = pages.filter(page => page.category && page.category.equals(gs._id));
  });
  
  Object.keys(categorizedPages).forEach((category) => {
    categorizedPages[category].forEach((page) => {
      if (page.query == undefined) { page.query = '' } else { page.query = `?${page.query}` }
      page.url = `${page._id}${page.query}`
    })
  })

  return categorizedPages
}

async function getWarmasterUnits() {
  const WarmasterUnits = await WarmasterUnit.find().populate('specialRules').populate('type').populate('army')
  return WarmasterUnits
}

async function getWFRPData() {
  const WFRPItems = await WFRPItem.find().populate('sources.source');
  const Files     = await File.find();

  let PDFS = {}

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
  return WFRPItems
}

function getQueryParams(url, query) {
  const queryParams = {};
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  params.forEach((value, key) => {
    // if (query == key) 
    queryParams[key] = value;
  });

  return queryParams;
}

module.exports = populateData;
