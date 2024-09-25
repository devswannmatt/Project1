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
  source: {
    type: Object
  },
  update: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WFRPItem', WFRPItemSchema);
