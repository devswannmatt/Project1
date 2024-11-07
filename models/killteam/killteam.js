const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  name: String,
  atk: Number,
  hit: String,
  dmg: String,
  wr: String
});

const ruleSchema = new mongoose.Schema({
  name: String,
  description: String
});

const operativeSchema = new mongoose.Schema({
  name: String,
  apl: Number,
  move: String,
  save: String,
  wounds: Number,
  weapons: [weaponSchema],
  rules: [ruleSchema]
});

module.exports = mongoose.model('Operative', operativeSchema);
