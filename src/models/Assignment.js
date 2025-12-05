const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    course_id: String,
    lesson_id: String,
    title: String,
    description: String,
    due_date: Date,
    max_score: Number,
    created_at: Date
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
