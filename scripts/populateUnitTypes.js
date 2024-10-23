const mongoose = require('mongoose');
const UnitType = require('../models/warmaster/warmasterUnitType'); // Adjust the path to your UnitType model
const TerrainType = require('../models/warmaster/warmasterTerrainType'); // Adjust the path to your UnitType model

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/config'; // MongoDB URI from your instructions

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Unit types with descriptions to populate
const unitTypesData = [
  { name: 'Infantry',           description: 'Basic foot soldiers, forming the core of many armies.', movement: 20, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Fords, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Infantry (Flying)',  description: 'Basic foot soldiers, forming the core of many armies.', movement: 20, access: 'Hills, Streams, Broken Ground, Loose Ground, Settlements, Roads, Bridges, Fords, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Cavalry',            description: 'Mounted units, often faster and with more impact on charges.', movement: 30, access: 'Hills, Streams, Broken Ground, Loose Ground, Settlements, Roads, Bridges, Fords, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Chariot',            description: 'Mounted units, often faster and with more impact on charges.', movement: 30, access: 'Hills, Streams, Broken Ground, Loose Ground, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Artillery',          description: 'Long-range units with powerful but slow attacks, often requiring support.', movement: 10, access: 'Hills, Streams, Broken Ground, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Machines',           description: 'Long-range units with powerful but slow attacks, often requiring support.', movement: 10, access: 'Hills, Streams, Broken Ground, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Monster',            description: 'Huge and fearsome creatures, often with special abilities.', movement: 20, access: 'Hills, Streams, Broken Ground, Loose Ground, Settlements, Roads, Bridges, Fords, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Monster (Flying)',   description: 'Huge and fearsome creatures, often with special abilities.', movement: 20, access: 'Hills, Streams, Broken Ground, Loose Ground, Settlements, Roads, Bridges, Fords, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Flying Monster',     description: 'Huge and fearsome creatures, often with special abilities.', movement: 100, access: 'Hills, Streams, Broken Ground, Loose Ground, Settlements, Roads, Bridges, Fords, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'General',            description: 'The army leader', movement: 60, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Hero',               description: 'Key figures in the army, often providing strategic boosts.', movement: 60, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Wizard',             description: 'Magic users capable of casting spells to support the army.', movement: 60, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Mount (Flying)',     description: 'Special flying mounts, providing mobility and combat bonuses to their riders.', movement: 100, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Mount',              description: 'Special mounts, providing mobility and combat bonuses to their riders.', movement: 60, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Special',            description: 'Units with unique characteristics, often with special rules or abilities.', movement: 0, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' },
  { name: 'Infantry (Special)', description: 'Units with unique characteristics, often with special rules or abilities.', movement: 60, access: 'Hills, Streams, Broken Ground, Loose Ground, Woods, Settlements, Roads, Bridges, Low Obstacles, High Obstacles, Fortress Walls' }
];

// Function to find special rules by their names
async function getTerrainTypes(terrainTypesString) {
  if (terrainTypesString === "-") {
    return [];
  }
  
  const ruleNames = terrainTypesString.split(',').map(terrain => terrain.trim());
  const terrainTypes = await TerrainType.find({ name: { $in: ruleNames } });
  
  return terrainTypes.map(terrain => terrain._id); // Return array of ObjectIds
}

// Function to populate UnitTypes
async function populateUnitTypes() {
  try {
    // Clear all existing units from the WarmasterUnit collection
    await UnitType.deleteMany({});
    console.log('All units cleared from the WarmasterUnit collection.');

    for (let unitTypeData of unitTypesData) {
      const existingUnitType = await UnitType.findOne({ name: unitTypeData.name });
      const terrainTypes = await getTerrainTypes(unitTypeData.access);

      // Only create the UnitType if it doesn't already exist
      if (!existingUnitType) {
        const newUnitType = new UnitType({
          name: unitTypeData.name,
          movement: unitTypeData.movement,
          description: unitTypeData.description,
          access: terrainTypes
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
