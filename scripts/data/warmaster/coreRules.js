const coreRules = [
  {
    name: "Open",
    type: "rule",
    lines: [
      { name: "Hit Chance", text: "Attacks made against a unit in Open ground have a base hit chance of 4+, this can be modified by other rules." }
    ]
  },
  {
    name: "Defended",
    type: "rule",
    lines: [
      { name: "Hit Chance", text: "Attacks made against a unit in a Defended position have a base hit chance of 5+, this can be modified by other rules." }
    ]
  },
  {
    name: "Fortified",
    type: "rule",
    lines: [
      { name: "Hit Chance", text: "Attacks made against a unit in a Fortified position have a base hit chance of 6+, this can be modified by other rules." },
      { name: "Entrenched", text: "Units in a Fortified position cannot choose to Pursue." }
    ]
  },
  {
    name: "Infantry Support",
    type: "rule",
    lines: [
      { name: "Supporting Charge", text: "If this unit is in a Brigade with another Infantry unit, and it is touching the back edge of that infantry unit when it charges then this unit can move with that unit." },
      { name: "Support", text: "Each adjacent, unengaged Infantry stand gives friendly combats +1 Combat Resolution." }
    ]
  },
  {
    name: "Flying",
    type: "rule",
    lines: [
      { name: "Initiative", text: "Cannot evade" },
      { name: "Home Back", text: "If not within 20cm of a friendly character, this unit can move 10xD6cm towards any character before Orders are issued" },
      { name: "Orders", text: "This unit can only receive an order from a Character within 20cm" },
      { name: "Terrain", text: "This unit may move over terrain as if it were not there, but otherwise use their unit type for terrain access" }
    ]
  },
  {
    name: "Blunder",
    type: "chart",
    roll: "D6",
    lines: [
      { roll: "1",   name: "You must be crazy!", text: "The unit suffers a -1 Command penalty for the rest of the battle. If a brigade has blundered then this penalty applies to one unit and the player can choose which is affected. The penalty will apply to the whole brigade if an order is given to the brigade that includes the affected unit. This penalty is cumulative so it's theoretically possible for a unit's effectiveness to plummet to a seriously incompetent level. The unit/brigade may not move further that Command phase." },
      { roll: "2-3", name: "Blimey Sir! There's thousands of 'em!", text: "If there are no visible enemy units within a full pace move of the unit or brigade then the unit/brigade halts and in this case there is no further penalty. If there are visible enemy units within a full pace move of the blundering unit or brigade then the unit or each unit in a brigade must move the shortest route to get outside a full pace move from all enemy units. Where units have different moves, the brigade moves at the speed of the slowest. Once it has moved, the unit/brigade halts. If unable to comply, the unit/brigade moves as far away from all enemy units as possible instead." },
      { roll: "4-5", name: "No sense in getting killed sir!", text: "The Unit or Brigade does not move and cannot receive further orders this Command phase." },
      { roll: "6",   name: "Up and 'at 'em, men!", text: "The unit must move at its maximum full pace towards the nearest visible enemy unit and will charge the nearest enemy unit if it is possible to do so. If a whole brigade gets this result, then move each unit one at a time as the movement of one may affect the ability of subsequent units to charge because it blocks sight or access to base edges. Once units have moved, they halt as for a normal failed order. Once units have moved, or there is no visible enemy, they halt. The unit/brigade cannot receive any further orders that Command phase." }
    ]
  },
  {
    name: "Goes Wild (Giant)",
    type: "chart",
    roll: "D6",
    lines: [
      { roll: "1", name: "Stand and look Dopey", text: "The Giant will neither move nor fight this turn." },
      { roll: "2", name: "Wander off", text: "Move the Giant directly towards the nearest table edge. If he moves into another unit he will attack it regardless of which side it is on. If victorious in combat the Giant will hold his ground." },
      { roll: "3", name: "Throw object", text: "The object travels 1D6 x 5cm and, if it travels far enough to hit its target, strikes with 3 Attacks worked out in the usual way. If the target unit is engaged in combat, the hits are carried over to the combat resolution." },
      { roll: "4", name: "Go for a Walk", text: "The Giant moves straight forward at full pace in the direction he is facing in. If he reaches an enemy unit he will attack as normal. If he reaches a friendly unit he will walk straight through and out the other side if there is room and he has sufficient move. If he reaches a friendly unit and does not have sufficient move or enough room to walk all the way through then he halts on contact. A friendly unit that is walked through or contacted in this way instantly becomes confused as a result." },
      { roll: "5", name: "Attack!", text: "The Giant moves towards the nearest enemy unit that he can see as fast as he can. If he reaches the foe he will attack as normal. If friends are in the way he will walk through them causing confusion as described above. If there is no visible enemy the Giant does nothing this Command phase." },
      { roll: "6", name: "Charge!", text: "The Giant gives a mighty bellow and rushes straight at the nearest enemy unit that he can see. Move the Giant at double his normal full pace move. If he reaches an enemy unit, he fights by jumping up and down on the foe, furiously doubling his Attacks value in the first round of combat. If there is no visible enemy the Giant does nothing this Command phase." }
    ]
  },
  {
    name: "Steam Tank",
    type: "chart",
    roll: "D6",
    lines: [
      { roll: "1", name: "Destroyed", text: "The Steam Tank grinds to a halt rupturing steam and noxious gasses. Remove the Steam Tank as a casualty." },
      { roll: "2", name: "Broken Down", text: "The Steam Tank‘s drive has broken. It does not move further this turn and cannot move in future turns. Should it be obliged to move for any reason it is destroyed. Otherwise, the Steam Tank can continue to shoot and fight as normal." },
      { roll: "3", name: "Stuck", text: "The Steam tank does not move further this turn. It cannot shoot this turn. Otherwise it is unaffected and can move in future turns as normal." },
      { roll: "4", name: "Commander Slain", text: "The Steam Tank does not move further this turn. It can move in future turns but suffers a command penalty of -1 for the remainder of the game. The Steam Tank can shoot as normal." },
      { roll: "5", name: "Momentary Halt", text: "The Steam Tank cannot move further this turn but is otherwise unaffected." },
      { roll: "6", name: "Steam Overload", text: "The Steam Tank cannot move further this turn but can shoot with double the usual number of Attacks (6) to represent steam being uncontrollably diverted into weaponry." }
    ]
  },
  {
    name: "Command",
    type: "chart",
    roll: "-",
    lines: [
      { name: "0 to 20cm",  text: "No Command penalty, also the maximum range for Wizards." },
      { name: "21 to 40cm",  text: "-1 Command penalty" },
      { name: "42 to 60cm+", text: "-2 Command penalty, also the maximum range for Heroes. Extra -1 for every full 20cm." }
    ]
  }
]

module.exports = coreRules;