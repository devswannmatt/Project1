const spellsData = [
  {
    name: "Shield of Combat",
    cast: 4, range: 0, target: "Unit (Joined)", duration: "End of Next Turn (Enemy)", los: false,
    flavour: "The enemy's blows are magically deflected by unseen forces and cause no harm.",
    description: "The unit can re-roll failed armour rolls from melee attacks only.",
  },
  {
    name: "Eerie Mist",
    cast: 4, range: 30, target: "Unit (Enemy)", duration: "End of Next Turn (Enemy)", los: false,
    flavour: "An eerie mist rises about the enemy unit stifling the sights and sounds of battle.",
    description: "The unit cannot use its initiative. Any order given to the unit, or to any brigade of which it is a part, suffers a -1 Command penalty.",
  },
  {
    name: "Aerial Shield",
    cast: 5, range: 30, target: "Unit (Friendly)", duration: "Next Shooting Phase (Friendly)", los: false,
    flavour: "The enemy's missiles sparkle in the sunlight and vanish magically in mid-air causing no harm to their target.",
    description: "All enemies that shoot at the unit get -1 on their shooting rolls.",
  },
  {
    name: "Lady's Favour",
    cast: 5, range: 30, target: "Unengaged Unit (Friendly)", duration: "Instant", los: false,
    flavour: "A vision of The Lady appears to lead the Bretonnians into the midst of battle or away from danger.",
    description: "The unit can be moved as if it had received an order in the Command phase. Character stands that have joined the unit will not move with it: they remain where they are.",
  },
  {
    name: "Tree Singing",
    cast: 5, range: 30, target: "Unengaged Infantry (Friendly)", duration: "Next Turn or Unit Moves", los: false,
    flavour: "The Spell Weaver calls force a mass of tangling branches to surround ther troops, protecting them form harm.",
    description: "The target Infantry unit counts as Defended, even if it is in open terrain.",
  },
  {
    name: "Twilight Host",
    cast: 5, range: 30, target: "Unit (Friendly)", duration: "Next Magic Phase", los: true,
    flavour: "A weird enchantment forms around the target unit.",
    description: "The target unit causes Terror.",
  },
  {
    name: "Call of the Hunt",
    cast: 5, range: 30, target: "Unit (Friendly)", duration: "Instant", los: true,
    flavour: "The Spell Weaver's voice sings out across the battlefield directing troops above the tumult of combat with the magical Call of the Hunt.",
    description: "Unit may make a charge move into contact with the nearest visible enemy unit in the same way as when charging. Enemy may not Stand and Shoot.",
  },
  {
    name: "Fury of the Forest",
    cast: 6, range: 60, target: "Unit (Enemy)", duration: "Instant", los: true,
    flavour: "Roots and vines burst from the ground, dragging unwitting foes to their doom!",
    description: "Unengaged units are not driven back by this spell (the assault comes form the ground beneath their feet). Engaged units carry over any hits scored into the first round of combat; any hits scored count as having been struck in the combat itself.",
  },
  {
    name: "Mork Save Uz!",
    cast: 5, range: 30, target: "Unit (Friendly)", duration: "Beginning of Next Turn", los: false,
    flavour: "The Shaman summons the power of Mork to protect the greenskins from the enemy.",
    description: "This spell grants the unit a 5+ save until the beginning of their next turn. If the unit already has a saving roll, it can choose which one to take, but not both.",
  },
  {
    name: "Gerroff!!!",
    cast: 5, range: 60, target: "Unit (Enemy)", duration: "Instant", los: false,
    flavour: "The voice of Gork booms out across the battlefield driving back his foes with a rancid gale force yell.",
    description: "This spell drives back any unengaged enemy unit within range. The enemy is driven back 1D6 x 5cm towards its table edge, similar to a drive back from shooting, but cannot be routed by this effect. If it leaves the table edge, the unit rolls as per the main Warmaster rules.",
  },
  {
    name: "Brain Busta",
    cast: 5, range: 30, target: "Unit (Enemy)", duration: "Instant", los: true,
    flavour: "A fearsome bolt of pure Waaagh! energy issues from the Shaman’s outstretched hand and strikes an enemy unit.",
    description: "This spell functions as three shooting attacks that ignore armour saves. The Shaman must be able to see the target, and the spell cannot be directed at a unit in combat. A unit can be driven back by this spell as with ordinary shooting.",
  },
  {
    name: "Waaagh!",
    cast: 4, range: 30, target: "Unit (Goblins in Combat)", duration: "Next Combat Phase", los: false,
    flavour: "The shaman summons the power of the mighty Waaagh! to invigorate the greenskins.",
    description: "Cast on a friendly Goblin unit in combat (including Squig Herds, Wolf Riders, Wolf Chariots, and Pump Wagons, but excluding Trolls, Giants, and other non-greenskins). Each stand in the unit, including joined characters, gains +1 Attack.",
    
  }
];

module.exports = spellsData;