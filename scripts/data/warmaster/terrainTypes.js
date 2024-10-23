const terrainTypes = [
    {
        "name": "Hills",
        "references": 53,
        "description": "Impose no penalties on the movement of troops. All units can move over hills and slopes as long as they are not especially steep, rugged, or otherwise difficult. Infantry and artillery stands positioned on a hill are defended against units charging or shooting from lower positions.",
        "sightRange": 0,
        "access": [
            { name: "Infantry", defended: true },
            { name: "Cavalry" },
            { name: "Chariot" },
            { name: "Artillery" },
            { name: "Machines" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Streams",
        "references": 53,
        "description": "This terrain blocks the movement of Chariots, Artillery and Machines. Infantry can be defended along the river's edge against enemies charging from within or across a stream.",
        "sightRange": 99,
        "access": [
            { name: "Infantry", defended: true },
            { name: "Cavalry" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Broken Ground",
        "references": 53,
        "description": "This includes areas that are hard going, like treacherous ruins, scrub, irrigated muddy fields, or marshy ground. Infantry stands are defended in broken/marshy ground.",
        "sightRange": 99,
        "access": [
            { name: "Infantry", defended: true },
            { name: "Cavalry" },
            { name: "Chariot" },
            { name: "Artillery" },
            { name: "Machines" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Loose Ground",
        "references": 0,
        "description": "Cultivated fields, sand dunes, rocky ground, or fully grown cornfields. Charging units get no bonus in loose terrain, and it is impenetrable to Chariots, Artillery and Machines.",
        "sightRange": 99,
        "access": [
            { name: "Infantry" },
            { name: "Cavalry" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Woods",
        "references": 0,
        "description": "Substantial areas of growing trees or tall vegetation. Only Infantry can enter, and stands count as defended when inside.",
        "sightRange": 2,
        "access": [
            { name: "Infantry", defended: true }
        ]
    },
    {
        "name": "Settlements",
        "references": 53,
        "description": "Bordered areas with buildings, paths, and dividing walls. Infantry and artillery units count as defended within. All units can enter and be pursued.",
        "sightRange": 2,
        "access": [
            { name: "Infantry" },
            { name: "Cavalry" },
            { name: "Chariot" },
            { name: "Artillery" },
            { name: "Machines" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Building",
        "references": 0,
        "description": "Significant structures or clusters of terrain features. Impenetrable to all units and blocks line of sight.",
        "sightRange": 0,
        "access": []
    },
    {
        "name": "Rivers",
        "references": 0,
        "description": "Impenetrable to all units and doesn't block line of sight.",
        "sightRange": 99,
        "access": []
    },
    {
        "name": "Ravines",
        "references": 0,
        "description": "Impenetrable to all units and doesn't block line of sight.",
        "sightRange": 99,
        "access": []
    },
    {
        "name": "Mountains",
        "references": 0,
        "description": "Impenetrable to all units and blocks line of sight.",
        "sightRange": 0,
        "access": []
    },
    {
        "name": "Roads",
        "references": 0,
        "description": "Permit movement to units in column formation as for open ground. Roads don't block line of sight and give +1 to command for moving entirely along them.",
        "sightRange": 99,
        "access": [
            { name: "Infantry" },
            { name: "Cavalry" },
            { name: "Chariot" },
            { name: "Artillery" },
            { name: "Machines" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Bridges",
        "references": 0,
        "description": "All units can cross bridges without penalty.",
        "sightRange": 99,
        "access": [
            { name: "Infantry" },
            { name: "Cavalry" },
            { name: "Chariot" },
            { name: "Artillery" },
            { name: "Machines" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Fords",
        "references": 0,
        "description": "Chariots, Artillery and Machines cannot cross fords.",
        "sightRange": 99,
        "access": [
            { name: "Infantry" },
            { name: "Cavalry" },
            { name: "Monster" }
        ]
    },
    {
        "name": "Low Obstacles",
        "references": 0,
        "description": "These include ditches, hedges, fences, and low walls. Infantry and artillery count as defended behind these obstacles. Impenetrable to Chariots, Artillery and Machines.",
        "sightRange": 99,
        "access": [
            { name: "Infantry", defended: true },
            { name: "Cavalry" },
            { name: "Monster" },
            { name: "Artillery", cross: false, defended: true }
        ]
    },
    {
        "name": "High Obstacles",
        "references": 0,
        "description": "High walls and embankments intended for defense. Impenetrable to all troops except infantry, which count as fortified behind these obstacles. Blocks line of sight.",
        "sightRange": 0,
        "access": [
            { name: "Infantry", fortified: true }
        ]
    }
];

module.exports = terrainTypes;