const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'GameSystem',
    required: false
  },
  owner: {
    type: String,
    required: false
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', ImageSchema);
