const mongoose    = require('mongoose');
const Page        = require('./page');
const Log         = require('./log');
const User        = require('./user');
const Role        = require('./role');
const Template    = require('./template');
const gameSystem  = require('./gameSystem');
const Image       = require('./image');
const WFRPItem    = require('./wfrp/wfrpItem');
const WFRPSource  = require('./wfrp/wfrpSources');

const mongo = { url: 'mongodb://127.0.0.1:27017/config' }

const connectMongo = async () => {
  console.log('[MONGO] Attemping connection...');
  await mongoose.connect(mongo.url);
  console.log('[MONGO] Connected');
};

module.exports = { connectMongo, Page, Log, User, Role, Template, gameSystem, Image, WFRPItem, WFRPSource };
