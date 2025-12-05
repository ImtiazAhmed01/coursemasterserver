const Course = require('../models/Course');
const { v4: uuidv4 } = require('uuid');

exports.listCourses = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page || '1'));
        const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '12')));
        const skip = (page - 1) * limit;

        const search = req.query.search || '';
        const category = req.query.category || '';
        const tag = req.query.tag || '';
        const sort = req.query.sort || ''; // price_asc, price_desc, newest

        const filter = { is_published: true };
        if (category) filter.category_id = category;
        if (tag) filter.tags = tag;
        if (search) filter.$text = { $search: search };

        let query = Course.find(filter).skip(skip).limit(limit);
        if (sort === 'price_asc') query = query.sort({ price: 1 });
        else if (sort === 'price_desc') query = query.sort({ price: -1 });
        else if (sort === 'newest') query = query.sort({ created_at: -1 });
        else query = query.sort({ title: 1 });

        const [total, courses] = await Promise.all([Course.countDocuments(filter), query.exec()]);
        res.json({ page, total, totalPages: Math.ceil(total / limit), courses });
    } catch (err) {
        next(err);
    }
};

exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) { next(err); }
};

exports.createCourse = async (req, res, next) => {
    try {
        const now = new Date();
        const payload = {
            ...req.body,
            id: uuidv4(),
            created_at: now,
            updated_at: now,
            created_by: req.user._id
        };
        const course = await Course.create(payload);
        res.status(201).json(course);
    } catch (err) { next(err); }
};

exports.updateCourse = async (req, res, next) => {
    try {
        const course = await Course.findOneAndUpdate({ id: req.params.id }, { ...req.body, updated_at: new Date() }, { new: true });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) { next(err); }
};

exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findOneAndDelete({ id: req.params.id });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
};
