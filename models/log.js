const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  message: String,
  type: String,
  success: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', logSchema);

async function postLog(message, type, success) {
  const log = new Log({ message: message, type: type, success: success });
  await log.save();
}

module.exports = { Log, postLog }
