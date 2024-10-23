const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the TerrainType schema
const terrainTypeSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  references:  { type: Number, required: true },
  sightRange:  { type: Number, required: true },
  access: [
    {
      unitType: { type: Schema.Types.ObjectId, ref: 'UnitType' },
      defended: {
        type: Boolean,
        default: false
      },
      fortified: {
        type: Boolean,
        default: false
      },
      cross: {
        type: Boolean,
        default: true
      }
    }
  ]
});

const TerrainType = mongoose.model('TerrainType', terrainTypeSchema);

module.exports = TerrainType;
