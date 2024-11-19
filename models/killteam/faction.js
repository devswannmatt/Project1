const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  effect: { type: String, required: true }
});

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  effect: { type: String, required: true }
});

const factionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rules: [ruleSchema],
  equipment: [equipmentSchema]
});

module.exports = mongoose.model('Faction', factionSchema);
