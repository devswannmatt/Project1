const mongoose   = require('mongoose');
const Operative  = require('../../models/killteam/operative');
const WeaponRule = require('../../models/killteam/rules');
const Faction    = require('../../models/killteam/faction');

const kasrkinData = require('../data/killteam/kasrkin')
console.log('kasrkinData', kasrkinData)

mongoose.connect('mongodb://127.0.0.1:27017/config', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const operativeData = [
    {
      name: "Kasrkin Sergeant",
      apl: 3,
      move: "6\"",
      save: "4+",
      wounds: 9,
      weapons: [
        { name: "Hot-shot laspistol", atk: 4, hit: "3+", dmg: "3/4", wr: "Range 8\"" },
        { name: "Power weapon", atk: 4, hit: "3+", dmg: "4/6", wr: "Lethal 5+", melee: true },
        { name: "Plasma pistol (standard)", atk: 4, hit: "3+", dmg: "3/5", wr: "Range 8\", Piercing 1" },
        { name: "Plasma pistol (supercharge)", atk: 4, hit: "3+", dmg: "4/5", wr: "Range 8\", Hot, Lethal 5+, Piercing 1" },
        { name: "Chainsword", atk: 4, hit: "3+", dmg: "4/5", wr: "-", melee: true },
        { name: "Hot-shot lasgun", atk: 4, hit: "3+", dmg: "3/4", wr: "Range 8\"" },
        { name: "Gun butt", atk: 3, hit: "3+", dmg: "2/3", wr: "-", melee: true },
        { name: "Rules", atk: 3, hit: "3+", dmg: "2/3", wr: "-", melee: true, wr: "Severe, Saturate" }
      ],
      rules: [
        { name: "Tactical Command (0 AP)", description: "Select a friendly KASRKIN operative to gain a new SKILL AT ARMS until the Ready step of the next Strategy phase, or relocate the Clearance Sweep marker. Cannot perform this action within enemy control range." }
      ]
    },
    {
      name: "Kasrkin Combat Medic",
      apl: 2,
      move: "6\"",
      save: "4+",
      wounds: 8,
      weapons: [
        { name: "Hot-shot lasgun", atk: 4, hit: "3+", dmg: "3/4", wr: "-" },
        { name: "Gun butt", atk: 3, hit: "4+", dmg: "2/3", wr: "-", melee: true }
      ],
      rules: [
        { name: "Medic!", description: "Prevents a friendly KASRKIN operative within 3\" from being incapacitated once per turning point, leaving them with 1 wound and allowing a free Dash. Both operatives' APL are reduced by 1 until their next activations." },
        { name: "Medikit (0 AP)", description: "Heals a friendly KASRKIN operative within control range for up to 2D3 lost wounds. Cannot be used on an operative affected by the Medic! rule in the same turning point. Not usable within enemy control range." }
      ]
    },
    {
      name: "Kasrkin Demo-Trooper",
      apl: 2,
      move: "6\"",
      save: "4+",
      wounds: 8,
      weapons: [
        { name: "Hot-shot laspistol", atk: 4, hit: "3+", dmg: "3/4", wr: "Range 8\"" },
        { name: "Gun butt", atk: 3, hit: "4+", dmg: "2/3", wr: "-", melee: true }
      ],
      rules: [
        { name: "Melta Mine", description: "Carries the Melta Mine marker, can perform Pick Up Marker and Place Marker actions with a free Dash when placing." },
        { name: "Proximity Mine", description: "Inflicts 2D6+3 damage when within control range of another operative." },
        { name: "Blast Padding", description: "Re-roll one defense die against Blast or Torrent weapons. Immune to distance-based Devastating effects unless directly targeted." }
      ]
    },
    {
      name: "Kasrkin Gunner",
      apl: 2,
      move: "6\"",
      save: "4+",
      wounds: 8,
      weapons: [
        { name: "Flamer", atk: 4, hit: "2+", dmg: "3/3", wr: "Range 8\", Saturate, Torrent 2\"" },
        { name: "Grenade launcher (frag)", atk: 4, hit: "3+", dmg: "2/4", wr: "Blast 2\"" },
        { name: "Grenade launcher (krak)", atk: 4, hit: "3+", dmg: "4/5", wr: "Piercing 1" },
        { name: "Hot-shot volley gun (focused)", atk: 5, hit: "3+", dmg: "3/4", wr: "Piercing Crits 1" },
        { name: "Hot-shot volley gun (sweeping)", atk: 4, hit: "3+", dmg: "3/4", wr: "Piercing Crits 1, Torrent 1\"" },
        { name: "Meltagun", atk: 4, hit: "3+", dmg: "6/3", wr: "Range 6\", Devastating 4, Piercing 2" },
        { name: "Plasma gun (standard)", atk: 4, hit: "3+", dmg: "4/6", wr: "Piercing 1" },
        { name: "Plasma gun (supercharge)", atk: 4, hit: "3+", dmg: "5/6", wr: "Hot, Lethal 5+, Piercing 1" },
        { name: "Gun butt", atk: 3, hit: "4+", dmg: "2/3", wr: "-", melee: true }
      ],
      rules: []
    },
    {
      name: "Kasrkin Recon-Trooper",
      apl: 2,
      move: "6\"",
      save: "4+",
      wounds: 8,
      weapons: [
        { name: "Hot-shot lasgun", atk: 4, hit: "3+", dmg: "3/4", wr: "-" },
        { name: "Gun butt", atk: 3, hit: "4+", dmg: "2/3", wr: "-", melee: true }
      ],
      rules: [
        { name: "Reconnoitre Killzone", description: "Relocate strategy ploy costs 0CP if this operative is selected. Can use this in an INQUISITORIAL AGENT kill team." },
        { name: "AUSPEX SCAN (1 AP)", description: "Makes enemy operatives within 8\" non-obscured for shooting until incapacitated or its next activation. Not usable within enemy control range." }
      ]
    },
    {
      name: "Kasrkin Sharpshooter",
      apl: 2,
      move: "6\"",
      save: "4+",
      wounds: 8,
      weapons: [
        { name: "Hot-shot marksman rifle (concealed)", atk: 4, hit: "2+", dmg: "3/3", wr: "Devastating 3, Heavy, Silent, Concealed Position" },
        { name: "Hot-shot marksman rifle (mobile)", atk: 4, hit: "3+", dmg: "3/4", wr: "-" },
        { name: "Hot-shot marksman rifle (stationary)", atk: 4, hit: "2+", dmg: "3/3", wr: "Devastating 3, Heavy" },
        { name: "Gun butt", atk: 3, hit: "4+", dmg: "2/3", wr: "-", melee: true }
      ],
      rules: [
        { name: "Camo Cloak", description: "Ignores Saturate rule and can retain additional cover saves or retain a cover save as a critical success." },
        { name: "Concealed Position", description: "Rifle can only be used once in the first Shoot action during the battle." }
      ]
    },
    {
      name: "Kasrkin Trooper",
      apl: 2,
      move: "6\"",
      save: "4+",
      wounds: 8,
      weapons: [
        { name: "Hot-shot lasgun", atk: 4, hit: "3+", dmg: "3/4", wr: "-" },
        { name: "Gun butt", atk: 3, hit: "4+", dmg: "2/3", wr: "-", melee: true }
      ],
      rules: [
        { name: "Adaptive Equipment", description: "Once per turning point, a TROOPER can use Smoke or Stun Grenade actions. These actions don’t count towards their action limits if selected as equipment." }
      ]
    },
    {
      name: "Kasrkin Vox-Trooper",
      apl: 2,
      move: "6\"",
      save: "4+",
      wounds: 8,
      weapons: [
        { name: "Hot-shot lasgun", atk: 4, hit: "3+", dmg: "3/4", wr: "-" },
        { name: "Gun butt", atk: 3, hit: "4+", dmg: "2/3", wr: "-", melee: true }
      ],
      rules: [
        { name: "BATTLE COMMS (1 AP)", description: "Increases a selected friendly operative's APL by 1 (max 3). Can be used twice per activation but not within enemy control range." }
      ]
    }
];
  

const importData = async () => {
  try {
    await Operative.deleteMany();
    await Operative.insertMany(operativeData);
    console.log('Data Imported Successfully');

    // Clear existing data (if needed)
    await Faction.deleteMany();
    await Faction.insertMany(kasrkinData);
    
    console.log('Kasrkin Faction Data Imported Successfully');

    // mongoose.connection.close();
  } catch (error) {
    console.error('Error importing data:', error);
    mongoose.connection.close();
  }
};

const weaponRulesData = [
    { name: "Accurate x", description: "Retain up to x attack dice as successes without rolling." },
    { name: "Balanced", description: "Re-roll one attack die." },
    { name: "Blast x", description: "Hit primary and secondary targets within x distance separately." },
    { name: "Brutal", description: "Opponent can only block with critical successes." },
    { name: "Ceaseless", description: "Re-roll any attack dice that show a 1." },
    { name: "Devastating x", description: "Critical success inflicts x damage; retains success." },
    { name: "Heavy", description: "Cannot move and use this weapon in the same activation." },
    { name: "Hot", description: "Roll D6 after use; if less than Hit stat, take damage." },
    { name: "Lethal x+", description: "Successes x or higher become critical." },
    { name: "Limited x", description: "Use weapon x times before losing it." },
    { name: "Piercing x", description: "Defender rolls x fewer defense dice." },
    { name: "Piercing Crits x", description: "Defender rolls x fewer defense dice if a Critical hit is rolled." },
    { name: "Punishing", description: "Retain one fail as a normal success if you roll a critical." },
    { name: "Range x", description: "Only targets within x distance are valid." },
    { name: "Relentless", description: "Re-roll any attack dice." },
    { name: "Rending", description: "Normal success becomes critical if you roll a critical." },
    { name: "Saturate", description: "Defender can’t use cover saves." },
    { name: "Seek", description: "Ignore cover for selecting targets." },
    { name: "Severe", description: "Change one normal success to critical if no criticals are rolled." },
    { name: "Shock", description: "Discard one opponent’s success when you strike with a critical." },
    { name: "Silent", description: "Shoot with this weapon even if concealed." },
    { name: "Stun", description: "Critical success reduces target’s APL by 1." },
    { name: "Torrent x", description: "Hit multiple targets within x distance of the primary target." }
];

const importWeaponRules = async () => {
    try {
      await WeaponRule.deleteMany();
      await WeaponRule.insertMany(weaponRulesData);
      console.log('Weapon Rules Imported Successfully');
    //   mongoose.connection.close();
    } catch (error) {
      console.error('Error importing weapon rules:', error);
      mongoose.connection.close();
    }
};

importWeaponRules();
importData();
