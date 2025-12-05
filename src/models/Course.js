const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, index: true },
    slug: { type: String, index: true },
    description: String,
    instructor_name: String,
    instructor_bio: String,
    price: Number,
    thumbnail_url: String,
    level: String,
    category_id: String,
    tags: [String],
    is_published: { type: Boolean, default: false },
    created_at: Date,
    updated_at: Date,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
