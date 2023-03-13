const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    timeframe: Number,
    priority: Number,
    complete: { type: Boolean, default: false },
    important: { type: Boolean, default: false },
    subtask: [{ type: Schema.Types.ObjectId, ref: 'Subtask'}],
    createdBy: String
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);