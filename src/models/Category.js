const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    slug: String,
    description: String,
    created_at: Date
});
module.exports = mongoose.model('Category', CategorySchema);
