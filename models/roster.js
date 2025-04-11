const mongoose = require('mongoose');

const RosterSchema = new mongoose.Schema({
  owner: {
    type: String
  },
  gameSystem: {
    type: String
  },
  value: {
    max: {
      type: Number
    },
    current: {
      type: Number
    }
  },
  units: [
    {}
  ]
});

module.exports = mongoose.model('Roster', RosterSchema);