const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the WarmasterUnit schema
const warmasterUnitSchema = new Schema({
  army: {
    type: Schema.Types.ObjectId, // Reference to another model (e.g., UnitType)
    ref: 'WarmasterArmy',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: Schema.Types.ObjectId, // Reference to another model (e.g., UnitType)
    ref: 'UnitType',
    required: true
  },
  attacks: {
    type: String
  },
  range: {
    type: Number
  },
  hits: {
    type: Number
  },
  armour: {
    type: Number
  },
  command: {
    type: Number
  },
  size: {
    type: Number
  },
  points: {
    type: Number
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  specialRules: [{
    type: Schema.Types.ObjectId, // Array of references to SpecialRules model
    ref: 'SpecialRule'
  }],
  mounts: {
    type: String
  },
  spells: [{
    type: Schema.Types.ObjectId, // Array of references to SpecialRules model
    ref: 'WarmasterMagic'
  }],
  charts: [{
    type: Schema.Types.ObjectId, // Array of references to SpecialRules model
    ref: 'Rule'
  }],
});

// Create the WarmasterUnit model from the schema
const WarmasterUnit = mongoose.model('WarmasterUnit', warmasterUnitSchema);

module.exports = WarmasterUnit;
