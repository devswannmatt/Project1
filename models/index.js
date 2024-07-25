const mongoose = require('mongoose');
const Page = require('./page');
const Log = require('./log');
const User = require('./user');
const Role = require('./role');

const connectDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/config', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected');
};

module.exports = { Page, Log, User, Role, connectDB };
