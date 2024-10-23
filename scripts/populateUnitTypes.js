const mongoose = require('mongoose');
const UnitType = require('../models/warmaster/warmasterUnitType');

const unitTypesData = require('./data/unitTypes')

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/config';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


// Function to populate UnitTypes
async function populateUnitTypes() {
  try {
    // Clear all existing units from the WarmasterUnit collection
    await UnitType.deleteMany({});
    console.log('All units cleared from the WarmasterUnit collection.');

    for (let unitTypeData of unitTypesData) {
      const existingUnitType = await UnitType.findOne({ name: unitTypeData.name });

      // Only create the UnitType if it doesn't already exist
      if (!existingUnitType) {
        const newUnitType = new UnitType({
          name: unitTypeData.name,
          movement: unitTypeData.movement,
          description: unitTypeData.description
        });

        await newUnitType.save();
        console.log(`Saved UnitType: ${unitTypeData.name}`);
      } else {
        console.log(`UnitType ${unitTypeData.name} already exists`);
      }
    }

    console.log('All unit types saved successfully');
  } catch (error) {
    console.error('Error populating unit types:', error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}

// Call the function to populate UnitTypes
populateUnitTypes();
