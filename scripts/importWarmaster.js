const mongoose       = require('mongoose');
const WarmasterUnit  = require('../models/warmaster/warmasterUnit');
const UnitType       = require('../models/warmaster/warmasterUnitType');
const SpecialRule    = require('../models/warmaster/warmasterSpecialRule');
const TerrainType    = require('../models/warmaster/warmasterTerrainType');
const WarmasterArmy  = require('../models/warmaster/warmasterArmy');
const WarmasterMagic = require('../models/warmaster/warmasterMagic');
const CoreRule       = require('../models/warmaster/warmasterCoreRule');

const specialRulesData = require('./data/warmaster/specialRules')
const unitTypesData    = require('./data/warmaster/unitTypes')
const armiesData       = require('./data/warmaster/armies')
const spellsData       = require('./data/warmaster/spells')
const terrainTypesData = require('./data/warmaster/terrainTypes')
const unitsData        = require('./data/warmaster/units')
const coreRulesData    = require('./data/warmaster/coreRules')

mongoose.connect('mongodb://127.0.0.1:27017/config', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

async function importAllWarmasterData() {
  try {
    if (await populateCoreRules()                  === false) throw 'Core Rules Failed'
    if (await populateSpecialRules()               === false) throw 'Special Rules Failed' 
    if (await populateUnitTypes()                  === false) throw 'Unit Types Failed'
    if (await populateTerrainTypes()               === false) throw 'Terrain Types Failed'
    if (await populateWarmasterArmies()            === false) throw 'Armies Failed'
    if (await populateWarmasterMagic()             === false) throw 'Magic Failed'
    if (await resetUnits()                         === false) throw 'Unit Reset Failed'
    if (await populateWarmasterUnits('bretonnia')  === false) throw 'Bretonnia Units Failed'
    if (await populateWarmasterUnits('orc')        === false) throw 'Orc Units Failed'
    if (await populateWarmasterUnits('wood_elves') === false) throw 'Wood Elves Units Failed'
    if (await populateWarmasterUnits('goblins')    === false) throw 'Goblin Units Failed'
    if (await populateWarmasterUnits('empire')     === false) throw 'Empire Units Failed'
    if (await populateWarmasterUnits('chaos')      === false) throw 'Chaos Units Failed'
    if (await populateWarmasterUnits('tombKings')  === false) throw 'Tomb Kings Units Failed'

    console.log('All collections imported.');
  } catch (error) {
    console.error('Error populating unit types:', error);
  } finally {
    mongoose.connection.close();
  }
}

async function resetUnits() {
  try {
    await WarmasterUnit.deleteMany({});
    console.log('All units cleared from the WarmasterUnit collection.');
    return true
  } catch (error) {
    console.error('Error resetting units:', error);
    return false
  }
}

async function populateCoreRules() {
  try {
    await CoreRule.deleteMany({});
    for (let core of coreRulesData) {
      await new CoreRule(core).save();
      console.log(`Saved Warmaster Core Rule: ${core.name}`);
    }
    console.log('Core rules successfully added to the Collection');
  } catch (error) {
    console.error('Error adding special rules:', error);
    return false
  }
}

async function populateSpecialRules() {
  try {
    await SpecialRule.deleteMany({});
    
    const specialRules = specialRulesData.map(rule => ({
      name: rule.rule,
      description: rule.description,
      boon: rule.boon,
      chart: rule.chart
    }));

    for (let special of specialRules) {
      if (special.chart) special.chart = await getCharts(special.chart)
      await new SpecialRule(special).save();
      console.log(`Saved Warmaster Special Rule: ${special.name}`);
    }
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
      if (unitTypeData.coreRules) newUnitType.coreRules = await getCoreRules(unitTypeData.coreRules);

      await newUnitType.save()
      console.log(`Saved UnitType: ${unitTypeData.name}`)
    }

    console.log('All unit types saved successfully');
  } catch (error) {
    console.error('Error populating unit types:', error);
    return false
  }
}

async function populateWarmasterMagic() {
  try {
    await WarmasterMagic.deleteMany({});
    for (let spell of spellsData) {
      await new WarmasterMagic(spell).save();
      console.log(`Saved Warmaster Spell: ${spell.name}`);
    }
    console.log('All magic saved successfully');
  } catch (error) {
    console.error('Error populating Warmaster armies:', error);
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

async function populateWarmasterUnits(armyName) {
  try {
    for (let unitData of unitsData[`${armyName}`]) {
      const armyId = await getArmyIdByName(unitData.armyName);
      if (!armyId) {
        console.error(`Skipping unit ${unitData.unit} as army ${unitData.armyName} not found.`);
        continue;
      }

      const unitType     = await getOrCreateUnitType(unitData.type);
      const specialRules = await getSpecialRules(unitData.special_rules);
      const spells       = await getSpells(unitData.spells);
      // const charts       = await getCharts(unitData.charts);

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
        army: armyId,
        mounts: unitData.mounts,
        spells: spells
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

async function getSpecialRules(string) {
  if (string === "-") return [];
  
  const ruleNames    = string.split(',').map(rule => rule.trim());
  const specialRules = await SpecialRule.find({ name: { $in: ruleNames } });
  
  return specialRules.map(rule => rule._id);
}

async function getCoreRules(string) {
  if (string === "-") return [];
  
  const ruleNames = string.split(',').map(rule => rule.trim());
  const coreRules = await CoreRule.find({ name: { $in: ruleNames } });
  
  return coreRules.map(rule => rule._id);
}

async function getSpells(string) {
  if (!string) return [];
  
  const spellNames = string.split(',').map(spell => spell.trim());
  const spells     = await WarmasterMagic.find({ name: { $in: spellNames } });
  
  return spells.map(spell => spell._id);
}

async function getCharts(string) {
  if (!string) return [];
  
  const chartNames = string.split(',').map(chart => chart.trim());
  const charts     = await CoreRule.find({ name: { $in: chartNames } });
  
  return charts.map(chart => chart._id);
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