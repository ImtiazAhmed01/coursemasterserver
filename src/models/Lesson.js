const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    course_id: String,
    title: String,
    description: String,
    video_url: String,
    duration_minutes: Number,
    order_index: Number,
    is_free_preview: Boolean,
    created_at: Date
});

LessonSchema.index({ course_id: 1, order_index: 1 });

module.exports = mongoose.model('Lesson', LessonSchema);
