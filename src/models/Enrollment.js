const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    courseId: { type: String, index: true },
    batchId: String,
    progress: { type: Number, default: 0 },
    lessonsCompleted: [String], // lesson ids
    enrolledAt: { type: Date, default: Date.now }
});

EnrollmentSchema.index({ user: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
