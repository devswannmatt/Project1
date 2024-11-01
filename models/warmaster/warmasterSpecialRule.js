const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specialRuleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  boon: {
    type: Boolean
  },
  chart: { type: Schema.Types.ObjectId, ref: 'Rule' }
});
  
// Create the SpecialRule model from the schema
const SpecialRule = mongoose.model('SpecialRule', specialRuleSchema);

module.exports = SpecialRule;
