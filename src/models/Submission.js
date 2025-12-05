const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    assignment_id: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    link: String,
    submitted_at: Date,
    score: Number,
    feedback: String
});

SubmissionSchema.index({ assignment_id: 1, user: 1 });

module.exports = mongoose.model('Submission', SubmissionSchema);
