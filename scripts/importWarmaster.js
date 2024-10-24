const mongoose      = require('mongoose');
const WarmasterUnit = require('../models/warmaster/warmasterUnit');
const UnitType      = require('../models/warmaster/warmasterUnitType');
const SpecialRule   = require('../models/warmaster/warmasterSpecialRule');
const TerrainType   = require('../models/warmaster/warmasterTerrainType');
const WarmasterArmy = require('../models/warmaster/warmasterArmy');

const specialRulesData = require('./data/warmaster/specialRules')
const unitTypesData    = require('./data/warmaster/unitTypes')
const armiesData       = require('./data/warmaster/armies')
const terrainTypesData = require('./data/warmaster/terrainTypes')
const unitsData        = require('./data/warmaster/units')

mongoose.connect('mongodb://127.0.0.1:27017/config', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

async function importAllWarmasterData() {
  try {
    if (await populateSpecialRules()    === false) throw 'Special Rules Failed' 
    if (await populateUnitTypes()       === false) throw 'Unit Types Failed'
    if (await populateTerrainTypes()    === false) throw 'Terrain Types Failed'
    if (await populateWarmasterArmies() === false) throw 'Armies Failed'
    if (await populateWarmasterUnits()  === false) throw 'Units Failed'

    console.log('All collections imported.');
  } catch (error) {
    console.error('Error populating unit types:', error);
  } finally {
    mongoose.connection.close();
  }
}

async function populateSpecialRules() {
  try {
    await SpecialRule.deleteMany({});
    const specialRules = specialRulesData.map(rule => ({
      name: rule.rule,
      description: rule.description,
      boon: rule.boon
    }));
    await SpecialRule.insertMany(specialRules);
    console.log('Special rules successfully added to the Collection');
  } catch (error) {
    console.error('Error adding special rules:', error);
    return false
  }
}

async function populateUnitTypes() {
  try {
    await UnitType.deleteMany({})
    for (let unitTypeData of unitTypesData) {
      const newUnitType = new UnitType({
        name: unitTypeData.name,
        movement: unitTypeData.movement,
        description: unitTypeData.description
      })

      await newUnitType.save()
      console.log(`Saved UnitType: ${unitTypeData.name}`)
    }

    console.log('All unit types saved successfully');
  } catch (error) {
    console.error('Error populating unit types:', error);
    return false
  }
}

async function populateWarmasterArmies() {
  try {
    await WarmasterArmy.deleteMany({});
    for (let army of armiesData) {
      const newArmy = new WarmasterArmy({
        name: army.name,
        description: `${army.name} army from the Warmaster rulebook.`,
        armyRule: army.rule,
        pageNumber: army.pageNumber
      });

      await newArmy.save();
      console.log(`Saved Warmaster Army: ${army.name}`);
    }
    console.log('All armies saved successfully');
  } catch (error) {
    console.error('Error populating Warmaster armies:', error);
    return false
  }
}

async function populateTerrainTypes() {
  try {
    await TerrainType.deleteMany({});
    console.log('Cleared TerrainType collection.');

    for (let terrainData of terrainTypesData) {
      terrainData = await getUnitTypes(terrainData);

      const terrainType = new TerrainType(terrainData);
      await terrainType.save();
      console.log(`Saved terrain type: ${terrainData.name}`);
    }

    console.log('All terrain types populated successfully.');
  } catch (error) {
    console.error('Error populating terrain types:', error);
    return false
  }
}

async function populateWarmasterUnits() {
  try {
    await WarmasterUnit.deleteMany({});
    console.log('All units cleared from the WarmasterUnit collection.');

    for (let unitData of unitsData.bretonnia) {
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
        army: armyId
      });

      await warmasterUnit.save();
      console.log(`Saved unit: ${unitData.unit}`);
    }

    console.log('All units saved successfully');
  } catch (error) {
    console.error('Error populating Warmaster units:', error);
    return false
  }
}

async function getUnitTypes(terrainData) {
  for (const element of terrainData.access) {
    try {
      const unitType = await UnitType.findOne({ name: element.name });

      if (unitType) {
        element.unitType = unitType._id;
        delete element.name;
      } else {
        console.error(`UnitType for name "${element.name}" not found`);
      }
    } catch (error) {
      console.error(`Error fetching UnitType for "${element.name}":`, error);
    }
  }
  return terrainData;
}

async function getArmyIdByName(armyName) {
  try {
    const army = await WarmasterArmy.findOne({ name: armyName });
    if (!army) {
      console.error(`Army with name "${armyName}" not found.`);
      return null;
    }
    return army._id;
  } catch (error) {
    console.error(`Error fetching army "${armyName}":`, error);
    return null;
  }
}

async function getSpecialRules(specialRulesString) {
  if (specialRulesString === "-") {
    return [];
  }
  
  const ruleNames = specialRulesString.split(',').map(rule => rule.trim());
  const specialRules = await SpecialRule.find({ name: { $in: ruleNames } });
  
  return specialRules.map(rule => rule._id);
}

async function getOrCreateUnitType(unitTypeName) {
  let unitType = await UnitType.findOne({ name: unitTypeName });
  if (!unitType) {
    unitType = new UnitType({ name: unitTypeName, movement: 0, restrictions: [] });
    await unitType.save();
  }
  return unitType;
}

importAllWarmasterData();