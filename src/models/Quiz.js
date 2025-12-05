const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    course_id: String,
    lesson_id: String,
    title: String,
    description: String,
    passing_score: Number,
    time_limit_minutes: Number,
    created_at: Date
});

module.exports = mongoose.model('Quiz', QuizSchema);
