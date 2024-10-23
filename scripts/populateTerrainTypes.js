const mongoose = require('mongoose');
const TerrainType = require('../models/warmaster/warmasterTerrainType'); // Adjust path to your TerrainType model

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/config'; // Preferred MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


// Terrain types data to populate
const terrainTypesData = [
    {
        "name": "Hills",
        "pageNumbers": 53,
        "description": "Impose no penalties on the movement of troops. All units can move over hills and slopes as long as they are not especially steep, rugged, or otherwise difficult. Infantry and artillery stands positioned on a hill are defended against units charging or shooting from lower positions.",
        "block": "-"
    },
    {
        "name": "Streams",
        "pageNumbers": 53,
        "description": "This terrain blocks the movement of Chariots and Artillery/Machines. Infantry can be defended along the river's edge against enemies charging from within or across a stream. Streams and shallow rivers don't block line of sight.",
        "block": "Chariot, Artillery, Machine"
    },
    {
        "name": "Broken Ground",
        "pageNumbers": 53,
        "description": "This includes areas that are hard going, like treacherous ruins, scrub, irrigated muddy fields, or marshy ground. Infantry stands are defended in broken/marshy ground. This terrain counts as dense and doesn't block line of sight.",
        "block": "-"
    },
    {
        "name": "Loose Ground",
        "pageNumbers": "-",
        "description": "Cultivated fields, sand dunes, rocky ground, or fully grown cornfields. Charging units get no bonus in loose terrain, and it is impenetrable to Chariots and Artillery/Machines. It doesn't block line of sight.",
        "block": "Chariot, Artillery, Machine"
    },
    {
        "name": "Woods",
        "pageNumbers": "-",
        "description": "Substantial areas of growing trees or tall vegetation. Only Infantry can enter, and stands count as defended when inside. Woods and Tall Scrub are dense terrain with a visibility of 2 cm.",
        "block": "All, !Infantry"
    },
    {
        "name": "Settlements",
        "pageNumbers": 53,
        "description": "Bordered areas with buildings, paths, and dividing walls. Infantry and artillery units count as defended within. All units can enter and be pursued, and visibility within is 2 cm.",
        "block": "-"
    },
    {
        "name": "Building",
        "pageNumbers": "-",
        "description": "Significant structures or clusters of terrain features. Impenetrable to all units and blocks line of sight.",
        "block": "All"
    },
    {
        "name": "Rivers",
        "pageNumbers": "-",
        "description": "Impenetrable to all units and doesn't block line of sight.",
        "block": "All"
    },
    {
        "name": "Ravines",
        "pageNumbers": "-",
        "description": "Impenetrable to all units and doesn't block line of sight.",
        "block": "All"
    },
    {
        "name": "Mountains",
        "pageNumbers": "-",
        "description": "Impenetrable to all units and blocks line of sight.",
        "block": "All"
    },
    {
        "name": "Roads",
        "pageNumbers": "-",
        "description": "Permit movement to units in column formation as for open ground. Roads don't block line of sight and give +1 to command for moving entirely along them.",
        "block": "-"
    },
    {
        "name": "Bridges",
        "pageNumbers": "-",
        "description": "All units can cross bridges without penalty.",
        "block": "Chariots, Artillery, Machines"
    },
    {
        "name": "Fords",
        "pageNumbers": "-",
        "description": "Chariots and Artillery/Machines cannot cross fords.",
        "block": "Chariots, Artillery, Machines"
    },
    {
        "name": "Low Obstacles",
        "pageNumbers": "-",
        "description": "These include ditches, hedges, fences, and low walls. Infantry and artillery count as defended behind these obstacles. Impenetrable to Chariots and Artillery/Machines.",
        "block": "Chariots, Artillery, Machines"
    },
    {
        "name": "High Obstacles",
        "pageNumbers": "-",
        "description": "High walls and embankments intended for defense. Impenetrable to all troops except infantry, which count as fortified behind these obstacles. Blocks line of sight.",
        "block": "All, !Infantry"
    },
    {
        "name": "Fortress Walls",
        "pageNumbers": 87,
        "description": "Detailed rules can be found in the chapter Siege & Fortresses.",
        "block": "-"
    }
];

// Function to populate TerrainTypes
async function populateTerrainTypes() {
  try {
    await TerrainType.deleteMany({}); // Clear existing terrain types
    console.log('Cleared TerrainType collection.');

    for (let terrainData of terrainTypesData) {
      const terrainType = new TerrainType(terrainData);
      await terrainType.save();
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
