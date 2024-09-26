const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const WFRPItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  price: {
    type: Number
  },
  enc: {
    type: Number
  },
  sources: [
    {
      source: { type: Schema.Types.ObjectId, ref: 'WFRPSources' },  // Reference to another model
      pages: [String]  // Array of strings (page references)
    }
  ],
  update: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('WFRPItem', WFRPItemSchema);
