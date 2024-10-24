const armyData = {
    "bretonnia": [
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
          "special_rules": "Impetuous, Immune (Terror), Immune (Confusion), Immune (Push-back), Weak Charge"
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
module.exports = armyData;