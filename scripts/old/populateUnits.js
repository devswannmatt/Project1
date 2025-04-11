const mongoose = require('mongoose');
const WarmasterUnit = require('../../models/warmaster/warmasterUnit'); // Adjust the path to your WarmasterUnit model
const UnitType = require('../../models/warmaster/warmasterUnitType'); // Adjust the path to your UnitType model
const SpecialRule = require('../../models/warmaster/warmasterSpecialRule'); // Adjust the path to your SpecialRule model
const WarmasterArmy = require('../../models/warmaster/warmasterArmy'); // Adjust the path to your WarmasterArmy model

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/config'; // MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  const armyData = {
    "army_list": [
      {
          "armyName": "Bretonnia",
          "unit": "Men-at-Arms",
          "type": "Infantry",
          "attacks": 3,
          "range": 0,
          "hits": 3,
          "armour": 6,
          "command": 0,
          "size": 3,
          "points": 45,
          "min_max": "1/-",
          "special_rules": "-"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Bowmen",
          "type": "Infantry",
          "attacks": "3/1",
          "range": 30,
          "hits": 3,
          "armour": "0",
          "command": 0,
          "size": 3,
          "points": 55,
          "min_max": "-/-",
          "special_rules": "-"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Peasants",
          "type": "Infantry",
          "attacks": 3,
          "range": 0,
          "hits": 3,
          "armour": "0",
          "command": 0,
          "size": 3,
          "points": 30,
          "min_max": "-/4",
          "special_rules": "Undisciplined, Hesitant, Weak Charge"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Grail Pilgrims",
          "type": "Infantry (Special)",
          "attacks": 4,
          "range": 0,
          "hits": 3,
          "armour": "0",
          "command": 0,
          "size": 3,
          "points": 0,
          "min_max": "-/-",
          "special_rules": "Impetuous, Immune (Terror), Immune (Confusion), Immune (Drive-back), Weak Charge"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Squires",
          "type": "Cavalry",
          "attacks": "3/1",
          "range": 30,
          "hits": 3,
          "armour": 6,
          "command": 0,
          "size": 3,
          "points": 90,
          "min_max": "1/4",
          "special_rules": "-"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Knights",
          "type": "Cavalry",
          "attacks": 3,
          "range": 0,
          "hits": 3,
          "armour": 4,
          "command": 0,
          "size": 3,
          "points": 110,
          "min_max": "1/-",
          "special_rules": "Impetuous, Immune (Terror)"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Grail Knights",
          "type": "Cavalry",
          "attacks": 3,
          "range": 0,
          "hits": 3,
          "armour": 4,
          "command": 0,
          "size": 3,
          "points": 120,
          "min_max": "-/1",
          "special_rules": "Impetuous, Immune (Terror), Impact"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Pegasus Knights",
          "type": "Monster (Flying)",
          "attacks": 2,
          "range": 0,
          "hits": 3,
          "armour": 5,
          "command": 0,
          "size": 3,
          "points": 80,
          "min_max": "-/1",
          "special_rules": "Impetuous, Immune (Terror)"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Trebuchet",
          "type": "Artillery",
          "attacks": "1/4",
          "range": 80,
          "hits": 4,
          "armour": "0",
          "command": 0,
          "size": 1,
          "points": 100,
          "min_max": "-/1",
          "special_rules": "Move or Fire, Rout (10cm), Armour Sundering, Siege Expert, Indirect Fire"
      },
      {
        "armyName": "Bretonnia",
          "unit": "General",
          "type": "General",
          "attacks": "+2",
          "range": 0,
          "hits": 0,
          "armour": 0,
          "command": 9,
          "size": 1,
          "points": 125,
          "min_max": "1/1",
          "special_rules": "Character, Command (Unlimited), Immune (Attacks)",
          "mounts": "Hippogriff, Pegasus"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Hero",
          "type": "Hero",
          "attacks": "+1",
          "range": 0,
          "hits": 0,
          "armour": 0,
          "command": 8,
          "size": 1,
          "points": 80,
          "min_max": "-/2",
          "special_rules": "Character, Command (60cm), Immune (Attacks)",
          "mounts": "Pegasus"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Enchantress",
          "type": "Wizard",
          "attacks": "+0",
          "range": 0,
          "hits": 0,
          "armour": 0,
          "command": 7,
          "size": 1,
          "points": 45,
          "min_max": "-/1",
          "special_rules": "Character, Command (20cm), Immune (Attacks)",
          "mounts": "Pegasus, Unicorn "
      },
      {
        "armyName": "Bretonnia",
          "unit": "Unicorn",
          "type": "Mount",
          "attacks": "+1",
          "range": 0,
          "hits": 0,
          "armour": 0,
          "command": 0,
          "size": 0,
          "points": 15,
          "min_max": "-/1",
          "special_rules": "Surge of Power"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Pegasus",
          "type": "Mount (Flying)",
          "attacks": "+1",
          "range": 0,
          "hits": 0,
          "armour": 0,
          "command": 0,
          "size": 0,
          "points": 15,
          "min_max": "-/1",
          "special_rules": "-"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Hippogriff",
          "type": "Mount (Flying)",
          "attacks": "+2",
          "range": 0,
          "hits": 0,
          "armour": 0,
          "command": 0,
          "size": 0,
          "points": 80,
          "min_max": "-/1",
          "special_rules": "Terror"
      },
      {
        "armyName": "Bretonnia",
          "unit": "Grail Reliquae",
          "type": "Infantry (Special)",
          "attacks": "+0",
          "range": 0,
          "hits": 0,
          "armour": 0,
          "command": 0,
          "size": 0,
          "points": 60,
          "min_max": "-/1",
          "special_rules": "Inspiration (Grail Pilgrims)"
      }
    ]
  };

// Function to get the ID of an army by its name
async function getArmyIdByName(armyName) {
  try {
    const army = await WarmasterArmy.findOne({ name: armyName });
    if (!army) {
      console.error(`Army with name "${armyName}" not found.`);
      return null;
    }
    return army._id; // Return the army's _id
  } catch (error) {
    console.error(`Error fetching army "${armyName}":`, error);
    return null;
  }
}

// Function to find special rules by their names
async function getSpecialRules(specialRulesString) {
  if (specialRulesString === "-") {
    return [];
  }
  
  const ruleNames = specialRulesString.split(',').map(rule => rule.trim());
  const specialRules = await SpecialRule.find({ name: { $in: ruleNames } });
  
  return specialRules.map(rule => rule._id); // Return array of ObjectIds
}

// Function to create or get a UnitType
async function getOrCreateUnitType(unitTypeName) {
  let unitType = await UnitType.findOne({ name: unitTypeName });
  if (!unitType) {
    unitType = new UnitType({ name: unitTypeName, movement: 0, restrictions: [] });
    await unitType.save();
  }
  return unitType;
}

// Function to populate Warmaster units with army references
async function populateWarmasterUnits() {
  try {
    // Clear all existing units from the WarmasterUnit collection
    await WarmasterUnit.deleteMany({});
    console.log('All units cleared from the WarmasterUnit collection.');

    for (let unitData of armyData.army_list) {
      const armyId = await getArmyIdByName(unitData.armyName);
      if (!armyId) {
        console.error(`Skipping unit ${unitData.unit} as army ${unitData.armyName} not found.`);
        continue;
      }

      const unitType = await getOrCreateUnitType(unitData.type);
      const specialRules = await getSpecialRules(unitData.special_rules);

      const warmasterUnit = new WarmasterUnit({
        name: unitData.unit,
        type: unitType._id,
        attacks: unitData.attacks === '-' ? null : unitData.attacks,
        range: unitData.range     === '-' ? null : unitData.range,
        hits: unitData.hits       === '-' ? null : unitData.hits,
        armour: unitData.armour   === '-' ? null : unitData.armour,
        command: unitData.command === '-' ? null : unitData.command,
        size: unitData.size       === '-' ? null : unitData.size,
        points: unitData.points   === 'Special' ? 0 : parseInt(unitData.points),
        min: unitData.min_max.split('/')[0] === '-' ? null : parseInt(unitData.min_max.split('/')[0]),
        max: unitData.min_max.split('/')[1] === '-' ? null : parseInt(unitData.min_max.split('/')[1]),
        specialRules: specialRules,
        army: armyId // Reference to the army
      });

      await warmasterUnit.save();
      console.log(`Saved unit: ${unitData.unit}`);
    }

    console.log('All units saved successfully');
  } catch (error) {
    console.error('Error populating Warmaster units:', error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}

// Run the script to populate Warmaster units
populateWarmasterUnits();
