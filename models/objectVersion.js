var mongoose = require('mongoose');

var objectVersionSchema = new mongoose.Schema({
  object_type: String,
  timestamp: Date,
  object_changes: String
})

module.exports = mongoose.model('ObjectVersion', objectVersionSchema);
