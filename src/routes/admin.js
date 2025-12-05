const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
const AdminController = require('../controllers/admin');

router.use(protect, authorize('admin'));

router.get('/enrollments/:courseId', AdminController.getEnrollmentsForCourse);
router.get('/submissions/:courseId', AdminController.getSubmissionsForCourse);
router.get('/analytics/enrollments', AdminController.enrollmentAnalytics);

module.exports = router;
