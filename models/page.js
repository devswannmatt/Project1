const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
