const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const WFRPSourcesSchema = new Schema({
    code: {
        type: Number,
        required: true
      },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WFRPSources', WFRPSourcesSchema);
