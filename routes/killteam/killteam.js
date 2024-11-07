const express    = require('express');
const router     = express.Router();
const Operative  = require('../../models/killteam/operative');
const WeaponRule = require('../../models/killteam/rules');

router.get('/api/killteam/operatives', async (req, res) => {
  try {
    // Retrieve all weapon rules to create a lookup table
    const weaponRules = await WeaponRule.find();

    // Create a list of rule name patterns for flexible matching
    const rulePatterns = weaponRules.map(rule => {
      const pattern = rule.name.replace(/ x\+?$/, ' (\\d+\\+?)');
      return { pattern: new RegExp(`^${pattern}$`), description: rule.description };
    });

    // Retrieve all operatives and convert to plain JavaScript objects
    const operatives = await Operative.find().lean();

    // Process each operative's weapons to transform rule strings into an array of objects
    operatives.forEach(operative => {
      operative.weapons.forEach(weapon => {
        if (weapon.wr) {
          // Split the comma-delimited list into an array and map to objects with name and description
          weapon.wr = weapon.wr.split(',').map(ruleName => {
            ruleName = ruleName.trim(); // Remove extra whitespace
            // Attempt to match the rule name using the patterns
            const matchingRule = rulePatterns.find(rule => rule.pattern.test(ruleName));
            if (matchingRule) {
              // Extract the value from the rule name, e.g., "Lethal 5+" -> "5+"
              const valueMatch = ruleName.match(/\d+\+?/);
              const value = valueMatch ? valueMatch[0] : '';
              // Replace 'x' in the tooltip with the extracted value
              const tooltip = matchingRule.description.replace('x', value);
              return { name: ruleName, tooltip: tooltip };
            }
            return { name: ruleName, tooltip: 'Description not found' };
          });
        }
      });
    });

    console.log('Retrieved Operatives:', operatives);
    res.send({ operatives: operatives });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/killteam/weaponrules', async (req, res) => {
  try {
    const weaponRules = await WeaponRule.find()
    console.log('Retrieved WeaponRules:', weaponRules);
    res.send({ weaponRules: weaponRules });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
