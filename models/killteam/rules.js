const mongoose = require('mongoose');

const weaponRuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('WeaponRule', weaponRuleSchema);
