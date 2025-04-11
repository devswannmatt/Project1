const armyData = {
  bretonnia: [
    { "armyName": "Bretonnia", "unit": "Men-at-Arms", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 45, "min_max": "1/-", "special_rules": "-" },
    { "armyName": "Bretonnia", "unit": "Bowmen", "type": "Infantry (Ranged)", "attacks": "3/1", "range": 30, "hits": 3, "armour": "0", "command": 0, "size": 3, "points": 55, "min_max": "-/-", "special_rules": "-" },
    { "armyName": "Bretonnia", "unit": "Peasants", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": "0", "command": 0, "size": 3, "points": 30, "min_max": "-/4", "special_rules": "Undisciplined, Hesitant, Weak Charge" },
    { "armyName": "Bretonnia", "unit": "Grail Pilgrims", "type": "Infantry (Special)", "attacks": 4, "range": 0, "hits": 3, "armour": "0", "command": 0, "size": 3, "points": 0, "min_max": "-/-", "special_rules": "Impetuous, Immune (Terror), Immune (Confusion), Immune (Drive-back), Weak Charge" },
    { "armyName": "Bretonnia", "unit": "Squires", "type": "Cavalry", "attacks": "3/1", "range": 30, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 90, "min_max": "1/4", "special_rules": "-" },
    { "armyName": "Bretonnia", "unit": "Knights", "type": "Cavalry", "attacks": 3, "range": 0, "hits": 3, "armour": 4, "command": 0, "size": 3, "points": 110, "min_max": "1/-", "special_rules": "Impetuous, Immune (Terror)" },
    { "armyName": "Bretonnia", "unit": "Grail Knights", "type": "Cavalry", "attacks": 3, "range": 0, "hits": 3, "armour": 4, "command": 0, "size": 3, "points": 120, "min_max": "-/1", "special_rules": "Impetuous, Immune (Terror), Impact" },
    { "armyName": "Bretonnia", "unit": "Pegasus Knights", "type": "Monster (Flying)", "attacks": 2, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 80, "min_max": "-/1", "special_rules": "Impetuous, Immune (Terror)" },
    { "armyName": "Bretonnia", "unit": "Trebuchet", "type": "Artillery", "attacks": "1/4", "range": 80, "hits": 4, "armour": "0", "command": 0, "size": 1, "points": 100, "min_max": "-/1", "special_rules": "Move or Fire, Rout (10cm), Armour (Sundering), Siege Expert, Indirect Fire" },
    { "armyName": "Bretonnia", "unit": "General", "type": "General", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 9, "size": 1, "points": 125, "min_max": "1/1", "special_rules": "Character, Command (Unlimited), Immune (Attacks)", "mounts": "Hippogriff, Pegasus" },
    { "armyName": "Bretonnia", "unit": "Hero", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 80, "min_max": "-/2", "special_rules": "Character, Command (60cm), Immune (Attacks)", "mounts": "Pegasus" },
    { "armyName": "Bretonnia", "unit": "Enchantress", "type": "Wizard", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 7, "size": 1, "points": 45, "min_max": "-/1", "special_rules": "Character, Command (20cm), Immune (Attacks)", "mounts": "Pegasus, Unicorn", "spells": "Shield of Combat, Eerie Mist, Aerial Shield, Lady's Favour" },
    { "armyName": "Bretonnia", "unit": "Unicorn", "type": "Mount", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 15, "min_max": "-/1", "special_rules": "Surge of Power" },
    { "armyName": "Bretonnia", "unit": "Pegasus", "type": "Mount (Flying)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 15, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Bretonnia", "unit": "Hippogriff", "type": "Mount (Flying)", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 80, "min_max": "-/1", "special_rules": "Terror" },
    { "armyName": "Bretonnia", "unit": "Grail Reliquae", "type": "Infantry (Special)", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 60, "min_max": "-/1", "special_rules": "Inspiration (Grail Pilgrims)" }
  ],
  orc: [
    { "armyName": "Orcs", "unit": "Orc Warriors", "type": "Infantry", "attacks": 4, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 60, "min_max": "2/-", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Goblins", "type": "Infantry", "attacks": "2/1", "range": 15, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 30, "min_max": "2/-", "special_rules": "" },
    { "armyName": "Orcs", "unit": "Black Orcs", "type": "Infantry", "attacks": 4, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Trolls", "type": "Infantry", "attacks": 5, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/3", "special_rules": "Stupid, Regenerate" },
    { "armyName": "Orcs", "unit": "Ogres", "type": "Infantry", "attacks": 4, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 3, "points": 105, "min_max": "-/1", "special_rules": "Hatred (Human)" },
    { "armyName": "Orcs", "unit": "Boar Riders", "type": "Cavalry", "attacks": 4, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/-", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Wolf Riders", "type": "Cavalry", "attacks": "2/1", "range": 15, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 60, "min_max": "-/-", "special_rules": "Skirmishers" },
    { "armyName": "Orcs", "unit": "Wolf Chariots", "type": "Chariot", "attacks": 3, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 80, "min_max": "-/3", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Giant", "type": "Monster", "attacks": 8, "range": 0, "hits": 8, "armour": 5, "command": 0, "size": 1, "points": 135, "min_max": "-/1", "special_rules": "Independent, Goes Wild (Giant), Wounded (Giant), Terror", "charts": "Goes Wild (Giant)" },
    { "armyName": "Orcs", "unit": "Giant (Wounded)", "type": "Monster", "attacks": 4, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 1, "points": 0, "min_max": "-/-", "special_rules": "Independent, Goes Wild (Giant), Terror", "charts": "Goes Wild (Giant)" },
    { "armyName": "Orcs", "unit": "Rock Lobber", "type": "Artillery", "attacks": "1/3", "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 1, "points": 75, "min_max": "-/1", "special_rules": "Artillery (Stone Thrower)" },
    { "armyName": "Orcs", "unit": "Orc General", "type": "General", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 95, "min_max": "1/1", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Orc Hero", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 80, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Orc Shaman", "type": "Wizard", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 7, "size": 1, "points": 45, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Goblin Hero", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 7, "size": 1, "points": 45, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Goblin Shaman", "type": "Wizard", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 6, "size": 1, "points": 30, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Orcs", "unit": "Wyvern", "type": "Mount (Flying)", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 80, "min_max": "-/1", "special_rules": "Terror" },
    { "armyName": "Orcs", "unit": "Chariot", "type": "Mount (Chariot)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 10, "min_max": "-/1", "special_rules": "" }
  ],
  wood_elves: [
    { "armyName": "Wood Elves", "unit": "Glade Guard", "type": "Infantry", "attacks": "3/1", "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 65, "min_max": "2/4", "special_rules": "Accurate" },
    { "armyName": "Wood Elves", "unit": "Eternal Guard", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 60, "min_max": "-/3", "special_rules": "-" },
    { "armyName": "Wood Elves", "unit": "Wardancers", "type": "Infantry", "attacks": 4, "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 1, "points": 30, "min_max": "-/4", "special_rules": "Detachment (Glade Guard), Detachment (Eternal Guard)" },
    { "armyName": "Wood Elves", "unit": "Waywatchers", "type": "Infantry", "attacks": "1/2", "range": 30, "hits": 3, "armour": 0, "command": 0, "size": 2, "points": 60, "min_max": "-/1", "special_rules": "Ambush, Accurate, Armour (Piercing), Ambush" },
    { "armyName": "Wood Elves", "unit": "Dryads", "type": "Infantry", "attacks": 4, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 60, "min_max": "1/-", "special_rules": "Forest Spirit, Immune (Terror)" },
    { "armyName": "Wood Elves", "unit": "Treekin", "type": "Infantry", "attacks": 4, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/2", "special_rules": "Forest Spirit, Immune (Terror)" },
    { "armyName": "Wood Elves", "unit": "Glade Riders", "type": "Cavalry", "attacks": "3/1", "range": 30, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 90, "min_max": "-/3", "special_rules": "-" },
    { "armyName": "Wood Elves", "unit": "Wild Riders", "type": "Cavalry", "attacks": 3, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/2", "special_rules": "Forest Spirit, Immune (Terror), Aggressive" },
    { "armyName": "Wood Elves", "unit": "Warhawk Riders", "type": "Monster (Flying)", "attacks": "2/1", "range": 15, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 85, "min_max": "-/1", "special_rules": "Skirmishers" },
    { "armyName": "Wood Elves", "unit": "Treeman", "type": "Monster", "attacks": 6, "range": 0, "hits": 4, "armour": 4, "command": 0, "size": 1, "points": 130, "min_max": "-/1", "special_rules": "Forest Spirit, Immune (Terror), Woodland Folk, Terror" },
    { "armyName": "Wood Elves", "unit": "General", "type": "General", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 10, "size": 1, "points": 155, "min_max": "1/1", "special_rules": "-", "mounts": "Giant Stag, Warhawk, Forest Dragon" },
    { "armyName": "Wood Elves", "unit": "Noble", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 80, "min_max": "-/1", "special_rules": "-", "mounts": "Giant Stag, Warhawk, Forest Dragon" },
    { "armyName": "Wood Elves", "unit": "Treeman Ancient", "type": "Hero", "attacks": "+3", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 130, "min_max": "-/1", "special_rules": "Forest Ancient, Leader (Forest Spirit), Restricted (Magic Items), Terror", "spells": "Tree Singing" },
    { "armyName": "Wood Elves", "unit": "Branchwraith", "type": "Hero", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 90, "min_max": "-/1", "special_rules": "Forest Ancient, Leader (Forest Spirit), Restricted (Magic Items)", "spells": "Tree Singing" },
    { "armyName": "Wood Elves", "unit": "Spell Weaver", "type": "Wizard", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 80, "min_max": "-/1", "special_rules": "-", "spells": "Tree Singing, Twilight Host, Call of the Hunt, Fury of the Forest", "mounts": "Giant Stag, Warhawk, Forest Dragon, Unicorn" },
    { "armyName": "Wood Elves", "unit": "Giant Stag", "type": "Mount (Special)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 10, "min_max": "-/1", "special_rules": "" },
    { "armyName": "Wood Elves", "unit": "Unicorn", "type": "Mount (Special)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 15, "min_max": "-/1", "special_rules": "Surge of Power" },
    { "armyName": "Wood Elves", "unit": "Warhawk", "type": "Mount (Flying)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 15, "min_max": "-/1", "special_rules": "" },
    { "armyName": "Wood Elves", "unit": "Forest Dragon", "type": "Mount (Flying)", "attacks": "+3/+3", "range": 20, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 100, "min_max": "-/1", "special_rules": "Terror" }
  ],
  goblins: [
    { "armyName": "Goblins", "unit": "Goblins", "type": "Infantry", "attacks": "2/1", "range": 15, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 30, "min_max": "4/-", "special_rules": "Optional (Squig Herd)" },
    { "armyName": "Goblins", "unit": "Squig Herd", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 30, "min_max": "-/-", "special_rules": "-" },
    { "armyName": "Goblins", "unit": "Trolls", "type": "Infantry", "attacks": 5, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/4", "special_rules": "Stupid, Regenerate" },
    { "armyName": "Goblins", "unit": "Wolf Riders", "type": "Cavalry", "attacks": "2/1", "range": 15, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 60, "min_max": "2/-", "special_rules": "Skirmishers" },
    { "armyName": "Goblins", "unit": "Wolf Chariots", "type": "Chariot", "attacks": 3, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 80, "min_max": "-/4", "special_rules": "-" },
    { "armyName": "Goblins", "unit": "Pump Wagon", "type": "Chariot", "attacks": "D6", "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 1, "points": 50, "min_max": "-/2", "special_rules": "Attacks (D6/D3), Movement (1Dx10cm), Immune (Drive-back), Immune (Confusion), Loner, Worthless" },
    { "armyName": "Goblins", "unit": "Giant", "type": "Monster", "attacks": 8, "range": 0, "hits": 8, "armour": 5, "command": 0, "size": 1, "points": 135, "min_max": "-/1", "special_rules": "Independent, Goes Wild (Giant), Wounded (Giant), Terror", "charts": "Goes Wild (Giant)" },
    { "armyName": "Goblins", "unit": "Giant (Wounded)", "type": "Monster", "attacks": 4, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 1, "points": 0, "min_max": "-/-", "special_rules": "Independent, Goes Wild (Giant), Terror", "charts": "Goes Wild (Giant)" },
    { "armyName": "Goblins", "unit": "Doom Diver", "type": "Artillery", "attacks": "1/3", "range": 60, "hits": 2, "armour": 0, "command": 0, "size": 2, "points": 80, "min_max": "-/1", "special_rules": "Slow" },
    { "armyName": "Goblins", "unit": "Spear Chukka", "type": "Artillery", "attacks": "1/2", "range": 60, "hits": 2, "armour": 0, "command": 0, "size": 2, "points": 65, "min_max": "-/2", "special_rules": "Attacks (Bolt Thrower)" },
    { "armyName": "Goblins", "unit": "Goblin Warboss", "type": "General", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 80, "min_max": "1/1", "special_rules": "", "mounts": "Wolf Chariot, Wyvern" },
    { "armyName": "Goblins", "unit": "Goblin Hero", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 7, "size": 1, "points": 45, "min_max": "-/4", "special_rules": "", "mounts": "Wolf Chariot, Wyvern" },
    { "armyName": "Goblins", "unit": "Goblin Shaman", "type": "Wizard", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 6, "size": 1, "points": 30, "min_max": "-/2", "special_rules": "", "spells": "Mork Save Uz!, Gerroff!!!, Brain Busta, Waaagh!", "mounts": "Wolf Chariot, Wyvern" },
    { "armyName": "Goblins", "unit": "Chariot", "type": "Mount (Chariot)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 10, "min_max": "-/1", "special_rules": "" },
    { "armyName": "Goblins", "unit": "Wyvern", "type": "Mount (Flying)", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 80, "min_max": "-/1", "special_rules": "Terror" }
  ],
  empire: [
    { "armyName": "Empire", "unit": "Halberdiers", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 45, "min_max": "2/-", "special_rules": "-" },
    { "armyName": "Empire", "unit": "Crossbowmen", "type": "Infantry", "attacks": "3/1", "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 55, "min_max": "2/-", "special_rules": "Optional (Handgunners)" },
    { "armyName": "Empire", "unit": "Handgunners", "type": "Infantry", "attacks": "3/1", "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 65, "min_max": "-/3", "special_rules": "Armour (Piercing)" },
    { "armyName": "Empire", "unit": "Flagellants", "type": "Infantry", "attacks": 5, "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 70, "min_max": "-/1", "special_rules": "Impetuous, Immune (Drive-back), Immune (Terror)" },
    { "armyName": "Empire", "unit": "Skirmishers", "type": "Infantry", "attacks": 4, "range": 0, "hits": 3, "armour": 0, "command": 1, "size": 1, "points": 25, "min_max": "-/-", "special_rules": "Detachment" },
    { "armyName": "Empire", "unit": "Knights", "type": "Cavalry", "attacks": 3, "range": 0, "hits": 3, "armour": 4, "command": 0, "size": 3, "points": 110, "min_max": "-/-", "special_rules": "-" },
    { "armyName": "Empire", "unit": "Pistoliers", "type": "Cavalry", "attacks": "3/1", "range": 15, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 95, "min_max": "-/4", "special_rules": "Skirmishers" },
    { "armyName": "Empire", "unit": "Helblaster", "type": "Artillery", "attacks": "1/8-4-2", "range": 30, "hits": 2, "armour": 0, "command": 0, "size": 1, "points": 50, "min_max": "-/1", "special_rules": "Attacks (Helblaster), Armour (Piercing)" },
    { "armyName": "Empire", "unit": "Cannon", "type": "Artillery", "attacks": "1/2+ bounce", "range": 0, "hits": 2, "armour": 0, "command": 0, "size": 2, "points": 85, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Empire", "unit": "Steam Tank", "type": "Machine (Steam Tank)", "attacks": "3/3", "range": 30, "hits": 4, "armour": 3, "command": 0, "size": 1, "points": 130, "min_max": "-/1", "special_rules": "Heavy, Slow, Independent, Skirmisher, Armour (Piercing), Immune (Drive-back), Orders (Steam Tank)", "charts": "Steam Tank" },
    { "armyName": "Empire", "unit": "General", "type": "General", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 9, "size": 1, "points": 125, "min_max": "1/1", "special_rules": "-" },
    { "armyName": "Empire", "unit": "Hero", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 80, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Empire", "unit": "Wizard", "type": "Wizard", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 7, "size": 1, "points": 45, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Empire", "unit": "Griffon", "type": "Mount (Flying)", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 80, "min_max": "-/1", "special_rules": "Terror" },
    { "armyName": "Empire", "unit": "War Altar", "type": "Mount (Chariot)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 15, "min_max": "-/1", "special_rules": "Surge of Power" }
  ],
  tombKings: [
    { "armyName": "Tomb Kings", "unit": "Skeletons", "type": "Infantry", "attacks": 2, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 30, "min_max": "2/-", "special_rules": "-" },
    { "armyName": "Tomb Kings", "unit": "Skeleton Bowmen", "type": "Infantry", "attacks": "2/1", "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 45, "min_max": "2/-", "special_rules": "-" },
    { "armyName": "Tomb Kings", "unit": "Skeleton Cavalry", "type": "Cavalry", "attacks": 2, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 60, "min_max": "-/-", "special_rules": "-" },
    { "armyName": "Tomb Kings", "unit": "Skeletal Chariots", "type": "Chariot", "attacks": "3/1", "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/3", "special_rules": "-" },
    { "armyName": "Tomb Kings", "unit": "Carrion", "type": "Monster", "attacks": 2, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 65, "min_max": "-/1", "special_rules": "*1" },
    { "armyName": "Tomb Kings", "unit": "Bone Giant", "type": "Monster", "attacks": 6, "range": 0, "hits": 4, "armour": 4, "command": 0, "size": 1, "points": 110, "min_max": "-/1", "special_rules": "*2" },
    { "armyName": "Tomb Kings", "unit": "Sphinx", "type": "Monster", "attacks": 4, "range": 0, "hits": 6, "armour": 3, "command": 0, "size": 1, "points": 135, "min_max": "-/1", "special_rules": "*3" },
    { "armyName": "Tomb Kings", "unit": "Skull Chukka", "type": "Artillery", "attacks": "1/3", "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 1, "points": 85, "min_max": "-/1", "special_rules": "*4" },
    { "armyName": "Tomb Kings", "unit": "Bone Thrower", "type": "Artillery", "attacks": "1/2 + skewer", "range": 0, "hits": 2, "armour": 0, "command": 0, "size": 2, "points": 65, "min_max": "-/1", "special_rules": "*5" },
    { "armyName": "Tomb Kings", "unit": "Tomb King", "type": "General", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 9, "size": 1, "points": 130, "min_max": "1/1", "special_rules": "*6" },
    { "armyName": "Tomb Kings", "unit": "Liche Priest", "type": "Wizard", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 90, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Tomb Kings", "unit": "Zombie Dragon", "type": "Mount (Monstrous)", "attacks": "+3", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 100, "min_max": "-/1", "special_rules": "*7" },
    { "armyName": "Tomb Kings", "unit": "Liche Chariot", "type": "Mount (Chariot)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 10, "min_max": "-/1", "special_rules": "*8" }
  ],
  chaos: [
    { "armyName": "Chaos", "unit": "Chaos Warriors", "type": "Infantry", "attacks": 4, "range": 0, "hits": 4, "armour": 4, "command": 0, "size": 3, "points": 140, "min_max": "1/-", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Chaos Marauders", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 60, "min_max": "1/-", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Ogres", "type": "Infantry", "attacks": 4, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 3, "points": 105, "min_max": "-/1", "special_rules": "*1" },
    { "armyName": "Chaos", "unit": "Trolls", "type": "Infantry", "attacks": 5, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/3", "special_rules": "*2" },
    { "armyName": "Chaos", "unit": "Marauder Horsemen", "type": "Cavalry", "attacks": 3, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 90, "min_max": "-/4", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Chaos Knights", "type": "Cavalry", "attacks": 4, "range": 0, "hits": 4, "armour": 4, "command": 0, "size": 3, "points": 180, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Chaos Hounds", "type": "Cavalry", "attacks": 3, "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 40, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Chaos Chariots", "type": "Chariot", "attacks": 3, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 95, "min_max": "-/3", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Harpies", "type": "Monster", "attacks": 2, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 65, "min_max": "-/1", "special_rules": "*3" },
    { "armyName": "Chaos", "unit": "Dragon Ogres", "type": "Monster", "attacks": 6, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 3, "points": 230, "min_max": "-/1", "special_rules": "*4" },
    { "armyName": "Chaos", "unit": "Chaos Spawn", "type": "Monster", "attacks": "3/3", "range": 0, "hits": 4, "armour": 3, "command": 0, "size": 1, "points": 110, "min_max": "-/2", "special_rules": "*5" },
    { "armyName": "Chaos", "unit": "General", "type": "General", "attacks": "+2", "range": 0, "hits": 0, "armour": 0, "command": 9, "size": 1, "points": 125, "min_max": "1/1", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Hero", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 80, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Sorcerer", "type": "Wizard", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 90, "min_max": "-/1", "special_rules": "-" },
    { "armyName": "Chaos", "unit": "Chaos Dragon", "type": "Mount (Monstrous)", "attacks": "+3", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 100, "min_max": "-/1", "special_rules": "*6" },
    { "armyName": "Chaos", "unit": "Chariot", "type": "Mount (Chariot)", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 0, "size": 0, "points": 10, "min_max": "-/1", "special_rules": "*7" }
  ],
  skaven: [
    { "armyName": "Skaven", "unit": "Clanrats", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 40, "min_max": "2/-", "special_rules": "-" },
    { "armyName": "Skaven", "unit": "Stormvermin", "type": "Infantry", "attacks": 3, "range": 0, "hits": 3, "armour": 5, "command": 0, "size": 3, "points": 55, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Skaven", "unit": "Jezzails", "type": "Infantry", "attacks": "3/1", "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 70, "min_max": "-/2", "special_rules": "Armour (Piercing)" },
    { "armyName": "Skaven", "unit": "Plague Monks", "type": "Infantry", "attacks": 5, "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 70, "min_max": "-/2", "special_rules": "Impetuous, Immune (Drive-back), Immune (Terror)" },
    { "armyName": "Skaven", "unit": "Rat Swarms", "type": "Infantry", "attacks": 2, "range": 0, "hits": 3, "armour": 0, "command": 0, "size": 3, "points": 25, "min_max": "2/-", "special_rules": "Immune (Drive-back), Swarm, Restricted (Magic Items)" },
    { "armyName": "Skaven", "unit": "Gutter Runners", "type": "Infantry", "attacks": "3/1", "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 60, "min_max": "-/2", "special_rules": "Skirmishers, Ambush" },
    { "armyName": "Skaven", "unit": "Rat Ogres", "type": "Infantry", "attacks": 4, "range": 0, "hits": 4, "armour": 5, "command": 0, "size": 3, "points": 110, "min_max": "-/2", "special_rules": "-" },
    { "armyName": "Skaven", "unit": "Warp Lightning Cannon", "type": "Artillery (Mobile)", "attacks": "1/3", "range": 40, "hits": 2, "armour": 0, "command": 0, "size": 2, "points": 60, "min_max": "-/1", "special_rules": "Mobile, Misfire, Attacks (Warp Lightning Cannon)" },
    { "armyName": "Skaven", "unit": "Doom Wheel", "type": "Machine (Mobile)", "attacks": 5, "range": 0, "hits": 4, "armour": 4, "command": 0, "size": 1, "points": 125, "min_max": "-/1", "special_rules": "Impact (D6+1), Mobile, Terror" },
    { "armyName": "Skaven", "unit": "Grey Seer", "type": "General", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 9, "size": 1, "points": 130, "min_max": "1/1", "special_rules": "Wizard,Character, Command (20cm), Immune (Attacks)", "spells": "Wither, Warp Lightning, Death Frenzy, Plague" },
    { "armyName": "Skaven", "unit": "Hero", "type": "Hero", "attacks": "+1", "range": 0, "hits": 0, "armour": 0, "command": 8, "size": 1, "points": 70, "min_max": "-/2", "special_rules": "Character, Command (20cm), Immune (Attacks)" },
    { "armyName": "Skaven", "unit": "Warlock", "type": "Wizard", "attacks": "+0", "range": 0, "hits": 0, "armour": 0, "command": 6, "size": 1, "points": 30, "min_max": "-/1", "special_rules": "Character, Command (20cm), Immune (Attacks)", "spells": "Wither, Warp Lightning, Death Frenzy, Plague" },
    { "armyName": "Skaven", "unit": "Screaming Bell", "type": "Machine (Pushed)", "attacks": 0, "range": 0, "hits": 4, "armour": 4, "command": 0, "size": 1, "points": 125, "min_max": "-/1", "special_rules": "Mobile, Screaming Bell, Movement (Infantry), Immune (Drive-backs)" }
  ],
  vampireCounts: [
    { "armyName": "Vampire Counts", "unit": "Skeletons", "type": "Infantry", "attacks": 2, "range": 0, "hits": 3, "armour": 6, "command": 0, "size": 3, "points": 30, "min_max": "2/-", "special_rules": "-" },
    {
      "armyName": "Vampire Counts",
      "unit": "Zombies",
      "type": "Infantry",
      "attacks": 2,
      "range": 0,
      "hits": 4,
      "armour": 0,
      "command": 0,
      "size": 3,
      "points": 35,
      "min_max": "2/-",
      "special_rules": "-"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Ghouls",
      "type": "Infantry",
      "attacks": 4,
      "range": 0,
      "hits": 3,
      "armour": 0,
      "command": 0,
      "size": 3,
      "points": 55,
      "min_max": "-/-",
      "special_rules": "-"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Grave Guard",
      "type": "Infantry",
      "attacks": 3,
      "range": 0,
      "hits": 3,
      "armour": 5,
      "command": 0,
      "size": 3,
      "points": 60,
      "min_max": "-/4",
      "special_rules": "-"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Ethereal Host",
      "type": "Infantry",
      "attacks": 3,
      "range": 0,
      "hits": 4,
      "armour": 0,
      "command": 0,
      "size": 3,
      "points": 90,
      "min_max": "-/2",
      "special_rules": "Ethereal, Immune (Drive-back), Terror"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Black Knights",
      "type": "Cavalry",
      "attacks": 3,
      "range": 0,
      "hits": 3,
      "armour": 4,
      "command": 0,
      "size": 3,
      "points": 110,
      "min_max": "-/4",
      "special_rules": "-"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Dire Wolves",
      "type": "Cavalry",
      "attacks": 2,
      "range": 0,
      "hits": 3,
      "armour": 0,
      "command": 0,
      "size": 3,
      "points": 40,
      "min_max": "-/4",
      "special_rules": "Impact"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Fell Bats",
      "type": "Monster (Flying)",
      "attacks": 2,
      "range": 0,
      "hits": 3,
      "armour": 6,
      "command": 0,
      "size": 3,
      "points": 65,
      "min_max": "-/1",
      "special_rules": "Fly"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Vampire Lord",
      "type": "General",
      "attacks": "+2",
      "range": 0,
      "hits": 0,
      "armour": 0,
      "command": 9,
      "size": 1,
      "points": 150,
      "min_max": "1/1",
      "special_rules": "Character, Command (Unlimited), Immune (Attacks), Wizard",
      "spells": "Raise Dead, Vanhel's Danse Macabre, Death Bolt, Curse of Years"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Vampire",
      "type": "Hero",
      "attacks": "+1",
      "range": 0,
      "hits": 0,
      "armour": 0,
      "command": 8,
      "size": 1,
      "points": 80,
      "min_max": "-/2",
      "special_rules": "Character, Command (60cm), Immune (Attacks)"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Necromancer",
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
      "spells": "Raise Dead, Vanhel's Danse Macabre, Death Bolt, Curse of Years"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Winged Nightmare",
      "type": "Mount (Flying)",
      "attacks": "+2",
      "range": 0,
      "hits": 0,
      "armour": 0,
      "command": 0,
      "size": 0,
      "points": 80,
      "min_max": "-/1",
      "special_rules": "Fly, Terror"
    },
    {
      "armyName": "Vampire Counts",
      "unit": "Black Coach",
      "type": "Mount (Chariot)",
      "attacks": "+1",
      "range": 0,
      "hits": 0,
      "armour": 0,
      "command": 0,
      "size": 0,
      "points": 40,
      "min_max": "-/1",
      "special_rules": "Terror"
    }
  ]
};
module.exports = armyData;