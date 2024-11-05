const express        = require('express');
const router         = express.Router();
const CoreRule       = require('../../models/warmaster/warmasterCoreRule');
const SpecialRule    = require('../../models/warmaster/warmasterSpecialRule');
const WarmasterUnit  = require('../../models/warmaster/warmasterUnit');
const UnitType       = require('../../models/warmaster/warmasterUnitType');
const WarmasterArmy  = require('../../models/warmaster/warmasterArmy');
const TerrainType    = require('../../models/warmaster/warmasterTerrainType');
const WarmasterMagic = require('../../models/warmaster/warmasterMagic');

router.get('/api/warmaster/rules', async (req, res) => {
  try {
    const CoreRules    = await CoreRule.find()
    const SpecialRules = await SpecialRule.find()
    res.send({ core: CoreRules, special: SpecialRules });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/warmaster/armies', async (req, res) => {
  try {
    const WarmasterArmies = await WarmasterArmy.find()
    res.send(WarmasterArmies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/warmaster/spells', async (req, res) => {
  try {
    const Spells = await WarmasterMagic.find()
    res.send(Spells);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/warmaster/unit_types', async (req, res) => {
  try {
    const UnitTypes = await UnitType.find().populate('coreRules')
    res.send(UnitTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/warmaster/units', async (req, res) => {
  try {
    const WarmasterUnits = await WarmasterUnit.find()
      .populate({
        path: 'specialRules',
        populate: {
          path: 'chart'
        }
      })
      .populate('type')
      .populate('army', 'name')
      .populate('spells')
      // .populate('charts')
    res.send(WarmasterUnits);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/warmaster/terrain', async (req, res) => {
  try {
    const TerrainTypes = await TerrainType.find().populate('access.unitType');
    
    res.send(TerrainTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a Custom Army List

router.get('/warmaster/create', async (req, res) => {
  try {
    console.log('Warmaster Create')
    
    res.render('warmaster_create', {});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/api/warmaster/create_army', async (req, res) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    
    res.send(TerrainTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

async function createArmyList(userId, armyData) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const units = await Promise.all(
      armyData.units.map(async (unitData) => {
        const unit = await WarmasterUnit.findById(unitData.unitId);
        if (!unit) throw new Error(`Unit with ID ${unitData.unitId} not found`);
        return { unit: unit._id, quantity: unitData.quantity, notes: unitData.notes };
      })
    );

    const armyList = new ArmyList({
      name: armyData.name,
      description: armyData.description,
      createdBy: user._id,
      units
    });

    await armyList.save();
    console.log('Army List created successfully:', armyList);
  } catch (error) {
    console.error('Error creating Army List:', error);
  }
}

module.exports = router;