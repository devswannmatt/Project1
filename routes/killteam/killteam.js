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
      // Convert " x" to a pattern that matches any number with optional characters (e.g., quotes)
      const pattern = rule.name.replace(/ x\+?$/, ' (\\d+\\+?\\s?["\']?)');
      return { pattern: new RegExp(`^${pattern}$`), description: rule.description };
    });

    // Retrieve all operatives and convert to plain JavaScript objects
    const operatives = await Operative.find().lean();

    // Function to replace 'x' in tooltips with the actual value from rule names
    const replaceTooltip = (ruleName) => {
      // Attempt to match the rule name using the patterns
      const matchingRule = rulePatterns.find(rule => rule.pattern.test(ruleName));
      if (matchingRule) {
        // Extract the value from the rule name, e.g., "Lethal 5+"
        const valueMatch = ruleName.match(/\d+\+?\s?["\']?/);
        const value = valueMatch ? valueMatch[0] : '';
        // Replace 'x' in the tooltip with the extracted value
        return { name: ruleName, tooltip: matchingRule.description.replace('x', value) };
      }
      return { name: ruleName, tooltip: undefined }; // Use undefined for unmatched tooltips
    };

    // Process each operative's weapons and rules
    operatives.forEach(operative => {
      // Transform weapon rules
      operative.weapons.forEach(weapon => {
        if (weapon.wr) {
          weapon.wr = weapon.wr.split(',').map(ruleName => {
            ruleName = ruleName.trim();
            return replaceTooltip(ruleName);
          });
        }
      });

      // Transform operative rules
      operative.rules.forEach(rule => {
        if (rule.name) {
          rule.tooltip = replaceTooltip(rule.description).tooltip;
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
