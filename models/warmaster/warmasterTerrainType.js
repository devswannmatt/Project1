const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the TerrainType schema
const terrainTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pageNumbers: { type: String, required: true },
  block: { type: String, required: true }
});

const TerrainType = mongoose.model('TerrainType', terrainTypeSchema);

module.exports = TerrainType;
