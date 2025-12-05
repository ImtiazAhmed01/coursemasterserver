const express = require('express');
const router = express.Router();
const { listCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses');
const { protect, authorize } = require('../middleware/auth');

router.get('/', listCourses);
router.get('/:slug', getCourse);

router.post('/', protect, authorize('admin', 'instructor'), createCourse);
router.put('/:id', protect, authorize('admin', 'instructor'), updateCourse);
router.delete('/:id', protect, authorize('admin', 'instructor'), deleteCourse);

module.exports = router;
