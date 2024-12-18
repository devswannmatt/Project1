const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for each line in the lines array
const lineSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  roll: { type: String }
});

// Define the main schema
const RuleSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  lines: [lineSchema],
  roll: { type: String }
});

const CoreRule = mongoose.model('Rule', RuleSchema);

module.exports = CoreRule;