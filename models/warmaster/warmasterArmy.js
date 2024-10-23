const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the WarmasterArmy schema
const warmasterArmySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  armyRule: { type: String, default: '' },
  pageNumber: { type: Number, required: true }
});

const WarmasterArmy = mongoose.model('WarmasterArmy', warmasterArmySchema);

module.exports = WarmasterArmy;
