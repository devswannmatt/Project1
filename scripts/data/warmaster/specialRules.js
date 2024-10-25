const specialRulesData = [
      {
        "rule": "Impetuous",
        "description": "The unit always uses initiative to charge if possible. The unit will not use initiative to evade.",
        boon: false
      },
      {
        "rule": "Hatred (Human)",
        "description": "The unit always uses initiative to charge a Human unit if possible. Human units include all 'men' including, for example, Chaos Warriors and Marauders but not Dwarves or Elves.",
        boon: false
      },
      {
        "rule": "Fearless",
        "description": "The unit is immune to terror and does not suffer the usual -1 Attack modifier when fighting enemies that cause terror.",
        boon: true
      },
      {
        "rule": "Impact",
        "description": "The unit gains +1 Attack when charging enemies in the open.",
        boon: true
      },
      {
        "rule": "Fly",
        "description": "The unit has the ability to fly, giving it greater movement flexibility and the ability to ignore terrain.",
        boon: true
      },
      {
        "rule": "Terror",
        "description": "Units in base contact with an enemy Terror-causing unit suffer the Attack (-1) rule.",
        boon: true
      },
      {
        "rule": "Undisciplined",
        "description": "The unit suffers a -1 Command penalty unless part of a brigade with a non-Peasant unit.",
        boon: false
      },
      {
        "rule": "Hesitant",
        "description": "The unit cannot use initiative to charge but can use it to evade.",
        boon: false
      },
      {
        "rule": "Move or Fire",
        "description": "The unit can move, but if it moves, it cannot shoot in the same turn.",
        boon: false
      },
      {
        "rule": "Rout (10cm)",
        "description": "If driven back more than 10cm by shooting, the unit is destroyed.",
        boon: false
      },
      {
        "rule": "Surge of Power",
        "description": "Once per battle, the unit gains +1 to a spell casting roll.",
        boon: true
      },
      {
        "rule": "Attack (x)",
        "description": "The character, unit or mount provides x additional attacks.",
        boon: true
      },
      {
        "rule": "Armour Piercing",
        "description": "The target of this attack worsens their armour save by 1.",
        boon: true
      },
      {
        "rule": "Armour Sundering",
        "description": "The target of this attack cannot take armour saves.",
        boon: true
      },
      {
        "rule": "Siege Expert",
        "description": "The category of any cover bonus is worsened by 1 step. For example a unit in terrain that grants the Defended cover bonus would instead count as being in the Open.",
        boon: true
      },
      {
        "rule": "Accurate",
        "description": "Improve any rolls to hit made by this unit by 1.",
        boon: true
      },
      {
        "rule": "Immune (Terror)",
        "description": "The unit is immune to the effects of terror.",
        boon: true
      },
      {
        "rule": "Immune (Confusion)",
        "description": "The unit is immune to confusion.",
        boon: true
      },
      {
        "rule": "Immune (Push-back)",
        "description": "The unit is immune to push-back from ranged attacks.",
        boon: true
      },
      {
        "rule": "Indirect Fire",
        "description": "This unit is able to fire at targets it cannot see, but only if there are no other legal targets. These attacks will always hit on a 6+.",
        boon: true
      },
      {
        "rule": "Weak Charge",
        "description": "This unit is able to Support and Charge, but when it charges it doesn't receive the Attack (1) bonus.",
        boon: false
      },
      {
        "rule": "Command (Unlimited)",
        "description": "The character is able to issue orders to any friendly unit on the battlefield. If this order fails, no more orders maybe issued by any characters.",
        boon: true
      },
      {
        "rule": "Command (60cm)",
        "description": "The character is able to issue orders to any friendly unit within 60cm. If this order fails, then this character may issue no further orders. ",
        boon: true
      },
      {
        "rule": "Command (20cm)",
        "description": "The character is able to issue orders to any friendly unit within 20cm. If this order fails, then this character may issue no further orders.",
        boon: true
      },
      {
        "rule": "Character",
        "description": "Able to join units, in which case the character will Fight, Advance, Pursue, Retreat or Stand with their unit unless terrain restrictions prevents this. Adds their attacks to any one stand in the joined unit. If the unit this character joined is destroyed, then the character is also destroyed.",
        boon: true
      },
      {
        "rule": "Immune (Attacks)",
        "description": "This unit cannot be attacked in any form, including magic. It cannot be removed from the table unless another rule, such as Character, overrides it.",
        boon: true
      },
      {
        "rule": "Inspiration (Grail Pilgrims)",
        "description": "Peasant units in base contact with this model use the stat line for Grail Pilgrims.",
        boon: true
      },
      {
        "rule": "Open",
        "description": "Attacks made against a unit in Open Ground have a base hit chance of 4+, this can be modified by other rules."
      },
      {
        "rule": "Defended",
        "description": "Attacks made against a unit in Defended Ground have a base hit chance of 5+, this can be modified by other rules."
      },
      {
        "rule": "Fortified",
        "description": "Attacks made against a unit in Fortified Ground have a base hit chance of 6+, this can be modified by other rules."
      },
      {
        "rule": "Regenerate",
        "description": "In each round of combat after whole stands have been removed this unit automatically regenerates one outstanding hit. If no hits are left over after removing whole stands then regeneration has no effect. Regenerated hits still count towards the combat result for the round.",
        boon: true
      },
      {
        "rule": "Stupid",
        "description": "When issuing an order to this unit, or a Brigade that includes this unit, the ranged command penalty is doubled.",
        boon: false
      },
      {
        "rule": "Skirmishers",
        "description": "This unit has a 360 degree line of sight for Evading, Shooting and, Stand and Shoot but not for Charging.",
        boon: true
      },
      {
        "rule": "Independent",
        "description": "This unit can only be brigaded with itself.",
        boon: false
      },
      {
        "rule": "Wounded (Giant)",
        "description": "If this unit has accumulated 5-7 hits by the end of the Shooting or Combat phase, and is no longer engaged in combat then it is deemed as been wounded. Use the Giant (Wounded) profile for the rest of the battle.",
        boon: false
      },
      {
        "rule": "Goes Wild (Giant)",
        "description": "If an order fails while targetting this unit, then you must roll on the Giant Goes Wild Chart. Where Ignore a Blunder in this case. If the Giant is in a Brigade, then roll once for each Giant.",
        boon: false
      },
      {
        "rule": "Artillery (Stone Thrower)",
        "description": "This unit uses all the rules for Stone Throwers.",
        boon: true
      },
      {
        "rule": "Artillery (Bolt Thrower)",
        "description": "This unit uses all the rules for Stone Throwers.",
        boon: true
      },
      {
        "rule": "Detachment (Eternal Guard)",
        "description": "This unit must be attached to a Eternal Guard unit, at which point it gains 5+ Armour and increases the size of that unit by 1. The loss of this unit is ignored for Command penalties and nevers cause the parent unit to become Irregular.",
        boon: true
      },
      {
        "rule": "Detachment (Glade Guard)",
        "description": "This unit must be attached to a Glade Guard unit, at which point it increases the size of that unit by 1. The loss of this unit is ignored for Command penalties and never causes the parent unit to become Irregular.",
        boon: true
      },
      {
        "rule": "Forest Spirit",
        "description": "This unit suffers a -1 Command penalty when being ordered by General or Noble.",
        boon: false
      },
      {
        "rule": "Aggressive",
        "description": "This unit gets +1 Attack in the first round of every combat but only when fighting to the front.",
        boon: true
      },
      {
        "rule": "Woodland Folk",
        "description": "This unit can enter woods as if it were Infantry, and it does not suffer the usual -1 Command penalty for doing so.",
        boon: true
      },
      {
        "rule": "Forest Ancient",
        "description": "This unit has -1 Command when issuing orders to any unit without the Forest Spirit rule.",
        boon: false
      },
      {
        "rule": "Leader (Forest Spirit)",
        "description": "This unit can only join Forest Spirit units.",
        boon: false
      },
      {
        "rule": "Restricted (Magic Items)",
        "description": "This unit can not be given magic items.",
        boon: false
      },
      {
        "rule": "Ambush",
        "description": "This unit can ambush by infiltrating onto the battlefield after the game begins. Issue an Infiltration order from any character, this order has unlimited range to a nominated spot which must be in dense terrain or on a table edge, excluding the enemy's edge. Distance and enemy proximity modifiers apply, but dense terrain penalties do not. If successful, place one stand on the spot with the rest around it, avoiding contact with enemy units. Orders can be issued by the same character within normal range after deployment. If infiltration fails, it can be retried in later turns.",
        boon: true
      },
      {
        "rule": "Optional (Squig Herd)",
        "description": "Up to two of these units per 1000 points maybe exchanged for Squig Herd.",
        boon: true
      },
      {
        "rule": "Loner",
        "description": "This unit can never be part of a Brigade, and cannot be joined by characters.",
        boon: false 
      },
      {
        "rule": "Worthless",
        "description": "This unit gives no victory points when killed and does not contribute to the friendly break point.",
        boon: false
      },
      {
        "rule": "Slow",
        "description": "This unit cannot Stand and Shoot",
        boon: false
      },
      {
        "rule": "Random Attacks (D6/D3)",
        "description": "This unit makes D6 attacks, or D3 attacks when it is charged or retreating as a result of combat.",
        boon: true
      },
      {
        "rule": "Random Movement (1Dx10cm)",
        "description": "Instead of using Orders or Initiative, this unit always moves a random 1D6 x 10cm per Command phase, this move can happen at any time but may not interupt a character giving orders.",
        boon: true
      }

]

module.exports = specialRulesData;