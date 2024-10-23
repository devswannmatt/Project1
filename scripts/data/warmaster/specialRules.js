const specialRulesData = [
      {
        "rule": "Impetuous",
        "description": "The unit always uses initiative to charge if possible and cannot be given orders instead. The unit will not use initiative to evade.",
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
      }
]

module.exports = specialRulesData;