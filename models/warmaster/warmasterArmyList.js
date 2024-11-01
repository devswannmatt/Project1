// Main schema for an army list
const ArmyListSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  units: [ArmyListItemSchema],
  createdAt: { type: Date, default: Date.now }
});

const ArmyList = mongoose.model('ArmyList', ArmyListSchema);

module.exports = ArmyList;
