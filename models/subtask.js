const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtaskSchema = new Schema({
    name: { type: String, required: true },
    complete: Boolean
});

module.exports = mongoose.model('Subtask', SubtaskSchema);