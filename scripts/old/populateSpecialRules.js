const mongoose = require('mongoose');
const SpecialRule = require('../../models/warmaster/warmasterSpecialRule'); // Adjust the path to your SpecialRule model

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/config';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Data to populate the SpecialRule collection


// Populate the SpecialRule collection
async function populateSpecialRules() {
  try {
    // Clear all existing units from the WarmasterUnit collection
    await SpecialRule.deleteMany({});
    console.log('All units cleared from the SpecialRule collection.');

    // Combine core rules and terrain rules into one array
    const rules = [...specialRulesData.core_rules, ...specialRulesData.terrain_rules];

    // Create an array of SpecialRule documents
    const specialRules = rules.map(rule => ({
      name: rule.rule,
      description: rule.description,
      boon: rule.boon
    }));

    // Insert the data into the database
    await SpecialRule.insertMany(specialRules);
    console.log('Special rules successfully added to the database');
  } catch (error) {
    console.error('Error adding special rules:', error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}

populateSpecialRules();
