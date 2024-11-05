const spellsData = [
  {
    name: "Shield of Combat",
    cast: 4,
    range: 0,
    target: "Unit (Joined)",
    duration: "End of Next Turn (Enemy)",
    los: false,
    flavour: "The enemy's blows are magically deflected by unseen forces and cause no harm.",
    description: "The unit can re-roll failed armour rolls from melee attacks only."
  },
  {
    name: "Eerie Mist",
    cast: 4,
    range: 30,
    target: "Unit (Enemy)",
    duration: "End of Next Turn (Enemy)",
    los: false,
    flavour: "An eerie mist rises about the enemy unit stifling the sights and sounds of battle.",
    description: "The unit cannot use its initiative. Any order given to the unit, or to any brigade of which it is a part, suffers a -1 Command penalty."
  },
  {
    name: "Aerial Shield",
    cast: 5,
    range: 30,
    target: "Unit (Friendly)",
    duration: "Next Shooting Phase (Friendly)",
    los: false,
    flavour: "The enemy's missiles sparkle in the sunlight and vanish magically in mid-air causing no harm to their target.",
    description: "All enemies that shoot at the unit get -1 on their shooting rolls."
  },
  {
    name: "Lady's Favour",
    cast: 5,
    range: 30,
    target: "Unit (Friendly, Unengaged)",
    duration: "Instant",
    los: false,
    flavour: "A vision of The Lady appears to lead the Bretonnians into the midst of battle or away from danger.",
    description: "The unit can be moved as if it had received an order in the Command phase. Character stands that have joined the unit will not move with it: they remain where they are."
  },
  {
    name: "Tree Singing",
    cast: 5,
    range: 30,
    target: "Infantry (Friendly, Unengaged)",
    duration: "Next Turn or Unit Moves",
    los: false,
    flavour: "The Spell Weaver calls forth a mass of tangling branches to surround the troops, protecting them from harm.",
    description: "The target Infantry unit counts as Defended, even if it is in open terrain."
  },
  {
    name: "Twilight Host",
    cast: 5,
    range: 30,
    target: "Unit (Friendly)",
    duration: "Next Magic Phase",
    los: true,
    flavour: "A weird enchantment forms around the target unit.",
    description: "The target unit causes Terror."
  },
  {
    name: "Call of the Hunt",
    cast: 5,
    range: 30,
    target: "Unit (Friendly)",
    duration: "Instant",
    los: true,
    flavour: "The Spell Weaver's voice sings out across the battlefield directing troops above the tumult of combat with the magical Call of the Hunt.",
    description: "Unit may make a charge move into contact with the nearest visible enemy unit in the same way as when charging. Enemy may not Stand and Shoot."
  },
  {
    name: "Fury of the Forest",
    cast: 6,
    range: 60,
    target: "Unit (Enemy)",
    duration: "Instant",
    los: true,
    flavour: "Roots and vines burst from the ground, dragging unwitting foes to their doom!",
    description: "Unengaged units are not driven back by this spell (the assault comes from the ground beneath their feet). Engaged units carry over any hits scored into the first round of combat; any hits scored count as having been struck in the combat itself."
  },
  {
    name: "Mork Save Uz!",
    cast: 5,
    range: 30,
    target: "Unit (Friendly)",
    duration: "Beginning of Next Turn",
    los: false,
    flavour: "The Shaman summons the power of Mork to protect the greenskins from the enemy.",
    description: "This spell grants the unit a 5+ save until the beginning of their next turn. If the unit already has a saving roll, it can choose which one to take, but not both."
  },
  {
    name: "Gerroff!!!",
    cast: 5,
    range: 60,
    target: "Unit (Enemy, Unengaged)",
    duration: "Instant",
    los: false,
    flavour: "The voice of Gork booms out across the battlefield driving back his foes with a rancid gale force yell.",
    description: "This spell drives back any unengaged enemy unit within range. The enemy is driven back 1D6 x 5cm towards its table edge, similar to a drive back from shooting, but cannot be routed by this effect. If it leaves the table edge, the unit rolls as per the main Warmaster rules."
  },
  {
    name: "Brain Busta",
    cast: 5,
    range: 30,
    target: "Unit (Enemy, Visible)",
    duration: "Instant",
    los: true,
    flavour: "A fearsome bolt of pure Waaagh! energy issues from the Shaman's outstretched hand and strikes an enemy unit.",
    description: "This spell functions as three shooting attacks that ignore armour saves. The Shaman must be able to see the target, and the spell cannot be directed at a unit in combat. A unit can be driven back by this spell as with ordinary shooting."
  },
  {
    name: "Waaagh!",
    cast: 4,
    range: 30,
    target: "Unit (Goblins, In Combat)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "The shaman summons the power of the mighty Waaagh! to invigorate the greenskins.",
    description: "Cast on a friendly Goblin unit in combat (including Squig Herds, Wolf Riders, Wolf Chariots, and Pump Wagons, but excluding Trolls, Giants, and other non-greenskins). Each stand in the unit, including joined characters, gains +1 Attack."
  },
  {
    name: "Ball of Flame",
    cast: 5,
    range: 30,
    target: "Line (30cm)",
    duration: "Instant",
    los: false,
    flavour: "A ball of flame shoots from the Wizard's outstretched arm, burning all in its path.",
    description: "Draw a 30cm line from the Wizard in any direction. Each unit under the line takes three shooting attacks. This can affect multiple units (including friendly units). Unengaged units can be driven back as with ordinary shooting; engaged units cannot but carry over hits to the first combat round."
  },
  {
    name: "Voice of Command",
    cast: 5,
    range: 30,
    target: "Unit (Friendly, Unengaged)",
    duration: "Instant",
    los: false,
    flavour: "The Wizard's voice booms out across the battlefield, guiding allies above the chaos with magical authority.",
    description: "Allows an unengaged friendly unit within range to move as if ordered in the Command phase. Only a single unit is affected, never a brigade. Characters joined to the unit remain in place."
  },
  {
    name: "Weird Enchantment",
    cast: 4,
    range: 30,
    target: "Unit (Enemy)",
    duration: "End of Opponent's Turn",
    los: false,
    flavour: "Strange lights and disorienting effects bewilder the target unit.",
    description: "Target enemy unit moves at half pace, counts all enemies as terrifying (-1 Attack) even if normally immune to terror. If the unit causes terror, it loses this ability while affected. Undead and Daemons do not count enemies as terrifying but suffer all other effects."
  },
  {
    name: "Teleport",
    cast: 2,
    range: 0,
    target: "Self",
    duration: "Instant",
    los: false,
    flavour: "With a swirl of his cloak and a crack of thunder, the Wizard reappears elsewhere on the battlefield.",
    description: "Allows the Wizard to move anywhere on the table, join or leave units, or enter or exit combat. After teleporting, the Wizard may cast a different second spell that turn, not including another Teleport."
  },
  {
    name: "Raise Dead",
    cast: 5,
    range: 30,
    target: "Combat Engagement",
    duration: "Instant",
    los: false,
    flavour: "At the Wizard's beckoning, the mangled corpses on the battleground rise to continue the slaughter.",
    description: "Creates a unit of three Skeleton stands in contact with an enemy or supporting a friendly stand in the engagement. Stands must not split the engagement, and if they touch unengaged enemy units, those join the engagement. Fails if stands cannot be placed. Raised units do not charge initially and do not count for break or victory points."
  },
  {
    name: "Touch of Death",
    cast: 4,
    range: 0,
    target: "Unit (Touching Wizard)",
    duration: "Instant",
    los: false,
    flavour: "The Wizard's enemies crumble to dust under his corrupting Touch of Death.",
    description: "If the Wizard is in a unit engaged in combat, this spell deals three attacks to a single enemy unit in contact. Hits carry over into the first round of combat, counting as first-round attacks for combat results."
  },
  {
    name: "Doom and Despair",
    cast: 4,
    range: 60,
    target: "Unit (Enemy)",
    duration: "End of Opponent's Turn",
    los: false,
    flavour: "A dark cloud of doom settles over the enemy, sapping their courage and spirit.",
    description: "Prevents an enemy unit from charging, pursuing, or advancing until the end of the next turn. Units normally required to charge, pursue, or advance are also affected, including Undead."
  },
  {
    name: "Death Bolt",
    cast: 5,
    range: 30,
    target: "Unit (Enemy, Visible)",
    duration: "Instant",
    los: true,
    flavour: "A fearsome bolt of sorcerous lightning flies from the Wizard's fingertips, striking an enemy.",
    description: "Three shooting attacks that ignore armor. The Wizard must see the target, which cannot be in combat. The target can be driven back as with ordinary shooting."
  },
  {
    name: "Boon of Chaos",
    cast: 4,
    range: 0,
    target: "Unit (Joined, In Combat)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "A dark power billows from the Sorcerer, filling his troops with the destructive vigour of chaos.",
    description: "The spell grants +1 Attack to every stand in the Sorcerer's unit for the next combat phase, including characters that have joined the unit."
  },
  {
    name: "Anger of the Gods",
    cast: 4,
    range: 30,
    target: "Units (Enemy, Within Range)",
    duration: "End of Opponent's Turn",
    los: false,
    flavour: "The anger of the chaos gods blots out the sun, sending clouds of rage across the battlefield.",
    description: "Affects all enemy units within 30cm of the Sorcerer with a -1 Command penalty for orders issued until the end of the next turn."
  },
  {
    name: "Rage of Chaos",
    cast: 5,
    range: 30,
    target: "Unit (Friendly, In Combat)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "A roaring daemonic shadow rises from the battlefield, fighting with ferocity and madness.",
    description: "Grants bonus attacks for the next combat phase by rolling D6s up to the number of stands in the unit. Each roll adds attacks, but if a roll matches any previous roll, the attacks instead hit the target unit in the first round of combat only."
  },
  {
    name: "Curse of Chaos",
    cast: 5,
    range: 30,
    target: "Unit (Enemy, Visible)",
    duration: "Instant",
    los: true,
    flavour: "An arc of pure energy strikes the foe, twisting flesh and bones into monstrous form.",
    description: "Three shooting attacks that ignore armor. The Sorcerer must see the target, which cannot be in combat. Affected units can be driven back as with ordinary shooting."
  },
  {
    name: "Foot of Gork",
    cast: 6,
    range: 50,
    target: "Unit (Enemy, Unengaged)",
    duration: "Instant",
    los: false,
    flavour: "A gigantic spectral green foot descends from the heavens, crushing the enemy to pulp.",
    description: "Deals six attacks to an unengaged enemy unit within range. The unit cannot be driven back, as the foot descends from above."
  },
  {
    name: "Gotcha",
    cast: 5,
    range: 30,
    target: "Line (30cm)",
    duration: "Instant",
    los: false,
    flavour: "With a mighty heave, a huge green fist strikes all within its path.",
    description: "Draw a 30cm line from the Shaman in any direction. Each unit under the line takes three shooting attacks. This can affect multiple units (including friendly units). Unengaged units can be driven back; engaged units cannot but carry over hits to the first combat round."
  },
  {
    name: "WAAAGH!!!",
    cast: 4,
    range: 30,
    target: "Unit (Orc or Goblin, In Combat)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "The shaman summons the mighty Waaagh! to invigorate the greenskins.",
    description: "Grants +1 Attack to every stand in an Orc or Goblin unit in combat (excluding Trolls, Ogres, Giants, or other non-greenskins) for the next combat phase, including characters that have joined the unit."
  },
  {
    name: "Storm of Stone",
    cast: 6,
    range: 30,
    target: "Units (Enemy, Within Range)",
    duration: "Instant",
    los: false,
    flavour: "The ground erupts around the Mage, and a hail of stones and dirt strikes his foes.",
    description: "Every enemy unit within range takes 3 attacks. Unengaged units are not driven back as the attack comes from below; engaged units carry over hits to the first round of combat."
  },
  {
    name: "Light of Battle",
    cast: 5,
    range: 30,
    target: "Units (Friendly, Within Range)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "A radiant light shines upon the Mage's companions, filling them with magical vigour.",
    description: "Every friendly unit and joined character within range gains +1 Attack for the next combat phase. These attacks can be assigned to different stands in each combat round."
  },
  {
    name: "Heaven's Fire",
    cast: 4,
    range: 30,
    target: "Unit (Friendly, Missile-Armed, Unengaged)",
    duration: "Instant",
    los: false,
    flavour: "The Mage imbues the Elven archers with unearthly swiftness, enabling them to rain death upon the enemy.",
    description: "Allows a friendly unengaged missile-armed infantry or cavalry unit (excluding artillery) to shoot twice this turn. The second shot incurs a -1 to hit."
  },
  {
    name: "Hail of Destruction",
    cast: 5,
    range: 30,
    target: "Unit (Enemy, Unengaged)",
    duration: "Instant",
    los: true,
    flavour: "A hail of fiery arrows flies from the Mage's fingertips and strikes an enemy unit.",
    description: "Three shooting attacks that ignore armor. The target can be driven back as with ordinary shooting."
  },
  {
    name: "Gaze of Sotek",
    cast: 5,
    range: 30,
    target: "Unit (Enemy, Unengaged)",
    duration: "Instant",
    los: true,
    flavour: "Burning jade rays leap from the wizard's eyes, enshrouding enemies in writhing coils of magic.",
    description: "Three shooting attacks that ignore armor. The target can be driven back as with ordinary shooting."
  },
  {
    name: "Mazdamundi's Revenge",
    cast: 4,
    range: 60,
    target: "Unit (Enemy)",
    duration: "End of Opponent's Turn",
    los: false,
    flavour: "The wizard's foes are hobbled with dread, hindering their movement.",
    description: "Prevents an enemy unit from charging, pursuing, or advancing until the end of the next turn. Units normally required to charge, pursue, or advance are also affected."
  },
  {
    name: "Wings of the Jungle",
    cast: 5,
    range: 0,
    target: "Unit (Friendly, Joined, Unengaged)",
    duration: "Instant",
    los: false,
    flavour: "An eerie aura lifts the Wizard and his companions, transporting them to another place.",
    description: "Moves an unengaged friendly unit joined by the Wizard as if it received an order in the Command phase. The Wizard moves with the unit, but other joined characters remain in place."
  },
  {
    name: "Shield of the Old Ones",
    cast: 5,
    range: 30,
    target: "Unit (Friendly, Engaged)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "The power of the Old Ones turns aside the enemy's blows.",
    description: "Improves the unit's Armor value by 1 (up to a maximum of 4+) for the next combat phase. Has no effect if the unit's armor is already 4+."
  },
  {
    name: "Wither",
    cast: 4,
    range: 30,
    target: "Unit (Enemy, Engaged)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "Chanting a vile curse, the caster inflicts a wasting, shrinking sickness on the enemy.",
    description: "Each stand in the target unit, including joined characters, deducts -1 from its Attacks value for the next combat phase."
  },
  {
    name: "Warp Lightning",
    cast: 5,
    range: 30,
    target: "Unit (Enemy, Unengaged)",
    duration: "Instant",
    los: true,
    flavour: "An arc of pure warp energy strikes the foe, melting flesh and twisting bones.",
    description: "Three shooting attacks that ignore armor. The target can be driven back as with ordinary shooting."
  },
  {
    name: "Death Frenzy",
    cast: 5,
    range: 30,
    target: "Unit (Friendly, Engaged)",
    duration: "Next Combat Phase",
    los: false,
    flavour: "The Skaven screams a blasphemous litany to the Horned Rat, driving the Skaven masses into a frenzy.",
    description: "Grants bonus attacks for the next combat phase by rolling D6s up to the number of stands in the unit. Each roll adds attacks, but if a roll matches any previous roll, the attacks instead hit the target unit in the first round of combat only."
  },
  {
    name: "Plague",
    cast: 6,
    range: 30,
    target: "Unit (Enemy, Unengaged)",
    duration: "Instant",
    los: false,
    flavour: "A swirling cloud of virulence envelops the enemy, causing eruptions of pustules and sores.",
    description: "Deals six attacks to an unengaged enemy unit within range. This attack does not cause Drive-backs."
  }
];

module.exports = spellsData;
