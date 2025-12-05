const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const studentController = require('../controllers/student');

router.get('/enrollments', protect, studentController.getEnrollments);
router.post('/enroll/:courseId', protect, studentController.enrollCourse);
router.post('/lesson/complete', protect, studentController.completeLesson);
router.post('/assignments/submit', protect, studentController.submitAssignment);
router.post('/quiz/submit', protect, studentController.submitQuiz);

module.exports = router;
