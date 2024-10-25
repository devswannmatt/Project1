const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warmasterMagicSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  flavour: { type: String, required: true },
  cast: { type: Number, required: true },
  range: { type: Number, required: true },
  target: { type: String, required: true },
  duration: { type: String, required: true }
});

const WarmasterMagic = mongoose.model('WarmasterMagic', warmasterMagicSchema);

module.exports = WarmasterMagic;
