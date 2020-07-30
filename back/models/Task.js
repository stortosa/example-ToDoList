const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  description: String,
  timestamp: Date,
  favourited: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
});
const Model = mongoose.model('Task', schemaName);
module.exports = Model;