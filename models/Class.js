const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timeSlot: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Class', ClassSchema);
