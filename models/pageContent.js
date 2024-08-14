const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PageContentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PageContent', PageContentSchema);
