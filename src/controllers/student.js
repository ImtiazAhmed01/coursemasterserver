const Enrollment = require('../models/Enrollment');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const Quiz = require('../models/Quiz');
const QuizQuestion = require('../models/QuizQuestion');
const { v4: uuidv4 } = require('uuid');

exports.getEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user._id }).lean();
        res.json(enrollments);
    } catch (err) { next(err); }
};

exports.enrollCourse = async (req, res, next) => {
    try {
        const { courseId, batchId } = req.params.courseId ? { courseId: req.params.courseId } : req.body;
        // courseId may be from param or body (different endpoints)
        const payload = {
            user: req.user._id,
            courseId: req.body.courseId || req.params.courseId,
            batchId: req.body.batchId || null
        };
        const exists = await Enrollment.findOne({ user: req.user._id, courseId: payload.courseId });
        if (exists) return res.status(400).json({ message: 'Already enrolled' });
        const created = await Enrollment.create(payload);
        res.status(201).json(created);
    } catch (err) { next(err); }
};

exports.completeLesson = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.body;
        if (!courseId || !lessonId) return res.status(400).json({ message: 'Missing fields' });

        const enrollment = await Enrollment.findOne({ user: req.user._id, courseId });
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

        if (!enrollment.lessonsCompleted.includes(lessonId)) {
            enrollment.lessonsCompleted.push(lessonId);
            // naive progress calc: lessonsCompleted / totalLessons (client can compute better)
            // For now just increment by 1
            enrollment.progress = Math.min(100, (enrollment.progress || 0) + 10);
            await enrollment.save();
        }
        res.json(enrollment);
    } catch (err) { next(err); }
};

exports.submitAssignment = async (req, res, next) => {
    try {
        const { assignment_id, content, link } = req.body;
        const assignment = await Assignment.findOne({ id: assignment_id });
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        const submission = await Submission.create({
            id: uuidv4(),
            assignment_id,
            user: req.user._id,
            content,
            link,
            submitted_at: new Date()
        });
        res.json(submission);
    } catch (err) { next(err); }
};

exports.submitQuiz = async (req, res, next) => {
    try {
        const { quizId, answers } = req.body;
        const quiz = await Quiz.findOne({ id: quizId });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        const questions = await QuizQuestion.find({ quiz_id: quizId });
        let score = 0;
        questions.forEach((q) => {
            const ans = answers[q.id];
            if (ans && ans === q.correct_answer) score += q.points || 0;
        });
        const max = questions.reduce((s, q) => s + (q.points || 0), 0);
        res.json({ score, max, passed: score >= (quiz.passing_score || 0) });
    } catch (err) { next(err); }
};
