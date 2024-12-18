const express       = require('express');
const router        = express.Router();
const ArmyList      = require('./models/armyList');
const WarmasterUnit = require('./models/warmasterUnit');
const User          = require('./models/user');

async function createTestArmy() {

}

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