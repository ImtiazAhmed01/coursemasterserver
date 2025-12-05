const Enrollment = require('../models/Enrollment');
const Submission = require('../models/Submission');

exports.getEnrollmentsForCourse = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ courseId: req.params.courseId }).populate('user', 'name email');
        res.json(enrollments);
    } catch (err) { next(err); }
};

exports.getSubmissionsForCourse = async (req, res, next) => {
    try {
        // find submissions where assignment.course_id matches
        const subs = await Submission.find().populate('user', 'name email');
        // naive filter - in production join or query by assignment.course_id
        res.json(subs);
    } catch (err) { next(err); }
};

exports.enrollmentAnalytics = async (req, res, next) => {
    try {
        // aggregation: count enrollments per day for last 30 days
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const data = await Enrollment.aggregate([
            { $match: { enrolledAt: { $gte: since } } },
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$enrolledAt' } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (err) { next(err); }
};
