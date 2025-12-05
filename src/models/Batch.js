const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    course_id: String,
    name: String,
    start_date: Date,
    end_date: Date,
    max_students: Number,
    created_at: Date
});

module.exports = mongoose.model('Batch', BatchSchema);
