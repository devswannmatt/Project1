module.exports = {
  name: "Kasrkin",
  rules: [
    {
      name: "Light ’Em Up",
      effect: "Whenever a friendly KASRKIN operative is shooting a ready enemy operative, that friendly operative’s ranged weapons have the Severe weapon rule."
    },
    {
      name: "Strike Fast",
      effect: "Whenever a friendly KASRKIN operative is performing the Reposition action, add 1\" to its Move stat."
    },
    {
      name: "Ice In Your Veins",
      effect: "Whenever a friendly KASRKIN operative is fighting or retaliating, or when an operative is shooting it, the first time an attack dice inflicts Normal Damage of 4 or more on this operative during that sequence, that dice inflicts 1 less damage on it."
    },
    {
      name: "For Cadia!",
      effect: "Add 1 to the Attack stat of friendly KASRKIN operatives’ melee weapons (to a maximum of 4)."
    }
  ],
  equipment: [
    {
      name: "Foregrip",
      description: "Fitted under the barrel of the gun, this foregrip helps stabilize the bearer’s weapon, improving its handling at close range.",
      effect: "Whenever a friendly KASRKIN operative is shooting an operative within 3\" of it, ranged weapons on its datacard (excluding weapons that include ‘pistol’ in their name) have the Accurate 1 weapon rule."
    },
    {
      name: "Long-Range Scope",
      description: "This weapon is fitted with a marksman’s scope, enabling great accuracy even at long range.",
      effect: "Whenever a friendly KASRKIN operative is shooting an operative more than 6\" from it, in the Roll Attack Dice step, if you retain any critical successes, its hot-shot weapons (excluding hot-shot laspistol) have the Saturate weapon rule."
    },
    {
      name: "Relics of Cadia",
      description: "Small personal effects remind the Kasrkin of their homeworld, those they have lost, and that which they fight for.",
      effect: "Once per turning point, when a friendly KASRKIN operative is shooting, if you roll two or more fails, you can discard one of them to retain another as a normal success instead."
    },
    {
      name: "Combat Daggers",
      description: "When close combat is required, the Kasrkin turn to their combat daggers in order to silence the enemy.",
      effect: "Friendly KASRKIN operatives have the following melee weapon: Combat dagger: ATK 3, HIT 4+, DMG 3/4"
    }
  ]
};
