const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Attempting to Connect MongoDB')
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/config');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Page = mongoose.model('Page', PageSchema);

module.exports = { Page, connectDB };
