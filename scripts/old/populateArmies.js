const mongoose = require('mongoose');
const WarmasterArmy = require('../../models/warmaster/warmasterArmy'); // Adjust path as necessary

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/config'; // Preferred MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Army data to populate
const armiesData = [
  { name: "Empire", pageNumber: 6 },
  { name: "Tomb Kings", pageNumber: 9 },
  { name: "Chaos", pageNumber: 12 },
  { name: "Orcs", pageNumber: 15 },
  { name: "High Elves", pageNumber: 18 },
  { name: "Dwarfs", pageNumber: 21 },
  { name: "Skaven", pageNumber: 24 },
  { name: "Lizardmen", pageNumber: 27 },
  { name: "Bretonnia", pageNumber: 30, rule:"Feudal Society: The Bretonnian army is essentially an army of Knights. The Knights’ contribution to the battle counts more than any other unit. To represent this, the Bretonnian army calculates when it must withdraw in a different way than other armies. Instead of counting all of its units at the start of the game, count only the number of units of Knights, Grail Knights, and Pegasus Knights. Once the army has lost half or more of its units of Knights, Grail Knights, and Pegasus Knights, it must withdraw." },
  { name: "Kislev", pageNumber: 33 },
  { name: "Dark Elves", pageNumber: 36 },
  { name: "Daemons", pageNumber: 39 },
  { name: "Vampire Counts", pageNumber: 42 },
  { name: "Araby", pageNumber: 45 },
  { name: "Dogs of War", pageNumber: 48 },
  { name: "Ogre Kingdoms", pageNumber: 52 },
  { name: "Albion", pageNumber: 55 },
  { name: "Goblin Army", pageNumber: 58 },
  { name: "Witch Hunters", pageNumber: 61 },
  { name: "Chaos Dwarves", pageNumber: 64 },
  { name: "Wood Elves", pageNumber: 67 },
  { name: "Beastmen", pageNumber: 70 },
  { name: "Norse", pageNumber: 73 },
  { name: "Cathay", pageNumber: 77 },
  { name: "Nippon", pageNumber: 80 },
  { name: "Regiments of Renown", pageNumber: 83 }
];

// Function to populate WarmasterArmies
async function populateWarmasterArmies() {
    // Clear all existing units from the WarmasterUnit collection
  await WarmasterArmy.deleteMany({});
  console.log('All units cleared from the WarmasterUnit collection.');

  try {
    for (let armyData of armiesData) {
      // Check if the army already exists
      const existingArmy = await WarmasterArmy.findOne({ name: armyData.name });

      if (!existingArmy) {
        const newArmy = new WarmasterArmy({
          name: armyData.name,
          description: `${armyData.name} army from the Warmaster rulebook.`,
          armyRule: armyData.rule,
          pageNumber: armyData.pageNumber
        });

        await newArmy.save();
        console.log(`Saved Warmaster Army: ${armyData.name}`);
      } else {
        console.log(`Warmaster Army ${armyData.name} already exists.`);
      }
    }

    console.log('All armies saved successfully');
  } catch (error) {
    console.error('Error populating Warmaster armies:', error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}

// Run the script to populate armies
populateWarmasterArmies();
