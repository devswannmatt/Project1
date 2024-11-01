const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for each unit in the army list
const ArmyListItemSchema = new Schema({
  unit: { type: Schema.Types.ObjectId, ref: 'WarmasterUnit', required: true },
  name: { type: String },
  quantity: { type: Number, default: 1, required: true },
  level: { type: Number, default: 1 },
  notes: { type: String }
});
