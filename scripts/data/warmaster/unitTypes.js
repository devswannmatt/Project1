// Unit types with descriptions to populate
const unitTypesData = [
    { name: 'Infantry',           description: 'Basic foot soldiers, forming the core of many armies.', movement: 20 },
    { name: 'Cavalry',            description: 'Mounted units, often faster and with more impact on charges.', movement: 30 },
    { name: 'Chariot',            description: 'Mounted units, often faster and with more impact on charges.', movement: 30 },
    { name: 'Artillery',          description: 'Long-range units with powerful but slow attacks, often requiring support.', movement: 10 },
    { name: 'Machines',           description: 'Long-range units with powerful but slow attacks, often requiring support.', movement: 10 },
    { name: 'Monster',            description: 'Huge and fearsome creatures, often with special abilities.', movement: 20 },
    { name: 'Monster (Flying)',   description: 'Huge and fearsome creatures, often with special abilities.', movement: 100 },
    { name: 'General',            description: 'The army leader', movement: 60 },
    { name: 'Hero',               description: 'Key figures in the army, often providing strategic boosts.', movement: 60 },
    { name: 'Wizard',             description: 'Magic users capable of casting spells to support the army.', movement: 60 },
    { name: 'Mount (Flying)',     description: 'Special flying mounts, providing mobility and combat bonuses to their riders.', movement: 100 },
    { name: 'Mount',              description: 'Special mounts, providing mobility and combat bonuses to their riders.', movement: 60 },
    { name: 'Special',            description: 'Units with unique characteristics, often with special rules or abilities.', movement: 0 },
    { name: 'Infantry (Special)', description: 'Units with unique characteristics, often with special rules or abilities.', movement: 20 }
];

module.exports = unitTypesData;