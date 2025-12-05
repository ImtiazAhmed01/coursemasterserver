const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    quiz_id: String,
    question_text: String,
    options: [String],
    correct_answer: String,
    points: Number,
    order_index: Number
});

module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
