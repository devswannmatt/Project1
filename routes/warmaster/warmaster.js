const express       = require('express');
const router        = express.Router();
const SpecialRule   = require('../../models/warmaster/warmasterSpecialRule');
const WarmasterUnit = require('../../models/warmaster/warmasterUnit');
const UnitType      = require('../../models/warmaster/warmasterUnitType');
const WarmasterArmy = require('../../models/warmaster/warmasterArmy');
const TerrainType   = require('../../models/warmaster/warmasterTerrainType');

router.get('/api/warmaster/rules', async (req, res) => {
  try {
    const SpecialRules = await SpecialRule.find()
    res.send(SpecialRules);
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

router.get('/api/warmaster/unit_types', async (req, res) => {
  try {
    const UnitTypes = await UnitType.find().populate('access')
    res.send(UnitTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/warmaster/units', async (req, res) => {
  try {
    const WarmasterUnits = await WarmasterUnit.find().populate('specialRules').populate('type').populate('army').populate('type.access')
    res.send(WarmasterUnits);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/warmaster/terrain', async (req, res) => {
  try {
    const TerrainTypes = await TerrainType.find()
    res.send(TerrainTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;