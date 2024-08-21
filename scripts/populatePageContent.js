const mongoose = require('mongoose');
const Template = require('../models/template');

// MongoDB URI
const db = 'mongodb://127.0.0.1:27017/config'; // Replace with your actual MongoDB URI

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// List of page templates to populate
const pageTemplates = [
  { templateName: 'basic.pug' },
  // Add more templates here as needed
];

// Function to populate the database
const populateTemplate = async () => {
  try {
    await Template.deleteMany(); // Clear existing data
    await Template.insertMany(pageTemplates);
    console.log('Page content templates populated successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating page content templates:', err);
    mongoose.connection.close();
  }
};

// Run the population script
populateTemplate();
