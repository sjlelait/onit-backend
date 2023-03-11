const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtaskSchema = new Schema({
    name: { type: String, required: true },
    complete: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Subtask', SubtaskSchema);