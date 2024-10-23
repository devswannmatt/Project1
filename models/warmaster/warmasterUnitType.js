const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the UnitType schema
const unitTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  movement: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

// Create the UnitType model from the schema
const UnitType = mongoose.model('UnitType', unitTypeSchema);

module.exports = UnitType;
