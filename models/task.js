const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    timeframe: Int32,
    priority: Int32,
    complete: Boolean,
    subtask: [{ type: Schema.Types.ObjectId, ref: 'Subtask'}]
});

module.exports = mongoose.model('Task', taskSchema);