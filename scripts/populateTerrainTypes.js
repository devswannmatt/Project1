const mongoose    = require('mongoose');
const TerrainType = require('../models/warmaster/warmasterTerrainType'); // Adjust path to your TerrainType model
const UnitType    = require('../models/warmaster/warmasterUnitType'); // Adjust path to your UnitType model

const terrainTypesData = require('./data/terrainTypes')

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/config'; // Preferred MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

async function getUnitTypes(terrainData) {
  // Loop through the access array and replace name with corresponding unitType._id
  for (const element of terrainData.access) {
    try {
      const unitType = await UnitType.findOne({ name: element.name }); // Fetch the unitType by name

      if (unitType) {
        element.unitType = unitType._id; // Set the unitType _id
        delete element.name; // Remove the name field since you're using unitType._id now
      } else {
        console.error(`UnitType for name "${element.name}" not found`);
      }
    } catch (error) {
      console.error(`Error fetching UnitType for "${element.name}":`, error);
    }
  }
  return terrainData; // Return modified terrainData
}

// Function to populate TerrainTypes
async function populateTerrainTypes() {
  try {
    await TerrainType.deleteMany({}); // Clear existing terrain types
    console.log('Cleared TerrainType collection.');

    for (let terrainData of terrainTypesData) {
      // Get and replace unit types within each terrain type
      terrainData = await getUnitTypes(terrainData);

      const terrainType = new TerrainType(terrainData); // Create a new TerrainType instance
      await terrainType.save(); // Save it to the database
      console.log(`Saved terrain type: ${terrainData.name}`);
    }

    console.log('All terrain types populated successfully.');
  } catch (error) {
    console.error('Error populating terrain types:', error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}

// Run the populate function
populateTerrainTypes();
