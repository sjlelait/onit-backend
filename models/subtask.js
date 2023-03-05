const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    complete: Boolean
});

module.exports = mongoose.model('Subtask', subtaskSchema);