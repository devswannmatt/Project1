const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GameSystemSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('GameSystem', GameSystemSchema);
