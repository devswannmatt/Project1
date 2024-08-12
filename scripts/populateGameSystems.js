const mongoose = require('mongoose');
const GameSystem = require('../models/gameSystem');

// MongoDB URI
const db = 'mongodb://127.0.0.1:27017/config'; // Replace with your actual MongoDB URI

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// List of game systems to populate
const gameSystems = [
  { code: 'wh', name: 'Warhammer', description: 'Fantasy battles game' },
  { code: 'w40k', name: 'Warhammer 40,000', description: 'Sci-fi battles game' },
  { code: 'nec', name: 'Necromunda', description: 'Gang warfare in the underhive' },
  { code: 'mor', name: 'Mordheim', description: 'Fantasy skirmish game' },
  { code: 'wm', name: 'Warmaster', description: 'Epic scale fantasy battles' }
];

// Function to populate the database
const populateGameSystems = async () => {
  try {
    await GameSystem.deleteMany(); // Clear existing data
    await GameSystem.insertMany(gameSystems);
    console.log('Game systems populated successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating game systems:', err);
    mongoose.connection.close();
  }
};

// Run the population script
populateGameSystems();
