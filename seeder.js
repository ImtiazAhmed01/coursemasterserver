require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Category = require('./src/models/Category');
const Course = require('./src/models/Course');
const Lesson = require('./src/models/Lesson');
const Batch = require('./src/models/Batch');
const Assignment = require('./src/models/Assignment');
const Quiz = require('./src/models/Quiz');
const QuizQuestion = require('./src/models/QuizQuestion');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

(async () => {
    try {
        await connectDB();
        await User.deleteMany();
        await Course.deleteMany();
        await Category.deleteMany();
        await Lesson.deleteMany();
        await Batch.deleteMany();
        await Assignment.deleteMany();
        await Quiz.deleteMany();
        await QuizQuestion.deleteMany();

        const adminPass = await bcrypt.hash('Admin123!', 10);
        const admin = await User.create({ name: 'Admin', email: 'admin@coursemaster.test', password: adminPass, role: 'admin' });
        console.log('Admin created:', admin.email);

        const categories = [
            { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Web Development', slug: 'web-development', description: 'Learn modern web development technologies', created_at: new Date('2024-12-05') },
            { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Data Science', slug: 'data-science', description: 'Master data analysis and machine learning', created_at: new Date('2024-12-05') },
            { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Mobile Development', slug: 'mobile-development', description: 'Build iOS and Android applications', created_at: new Date('2024-12-05') },
            { id: '550e8400-e29b-41d4-a716-446655440004', name: 'DevOps', slug: 'devops', description: 'Infrastructure and deployment automation', created_at: new Date('2024-12-05') },
            { id: '550e8400-e29b-41d4-a716-446655440005', name: 'UI/UX Design', slug: 'ui-ux-design', description: 'User interface and experience design', created_at: new Date('2024-12-05') }
        ];
        await Category.insertMany(categories);

        const courses = [
            {
                id: '650e8400-e29b-41d4-a716-446655440001',
                title: 'Complete React Development',
                slug: 'complete-react-development',
                description: 'Master React from basics to advanced concepts including hooks, context, Redux, and testing. Build production-ready applications.',
                instructor_name: 'Sarah Johnson',
                instructor_bio: '10+ years of experience in frontend development. Former lead developer at major tech companies.',
                price: 99.99,
                thumbnail_url: null,
                level: 'intermediate',
                category_id: '550e8400-e29b-41d4-a716-446655440001',
                tags: ['react', 'javascript', 'frontend'],
                is_published: true,
                created_at: new Date('2024-12-05'),
                updated_at: new Date('2024-12-05'),
                created_by: admin._id
            },
            {
                id: '650e8400-e29b-41d4-a716-446655440003',
                title: 'Node.js Backend Mastery',
                slug: 'nodejs-backend-mastery',
                description: 'Build scalable backend applications with Node.js, Express, MongoDB, and PostgreSQL. Learn REST APIs and microservices.',
                instructor_name: 'James Williams',
                instructor_bio: 'Senior backend engineer with 8 years experience building enterprise systems.',
                price: 149.99,
                thumbnail_url: null,
                level: 'advanced',
                category_id: '550e8400-e29b-41d4-a716-446655440001',
                tags: ['nodejs', 'backend', 'api'],
                is_published: true,
                created_at: new Date('2024-12-05'),
                updated_at: new Date('2024-12-05'),
                created_by: admin._id
            },
            {
                id: '650e8400-e29b-41d4-a716-446655440004',
                title: 'Mobile App Development with React Native',
                slug: 'react-native-mobile',
                description: 'Create cross-platform mobile apps for iOS and Android using React Native. Deploy to app stores.',
                instructor_name: 'Emily Rodriguez',
                instructor_bio: 'Mobile development expert. Published 20+ apps with millions of downloads.',
                price: 119.99,
                thumbnail_url: null,
                level: 'intermediate',
                category_id: '550e8400-e29b-41d4-a716-440003',
                tags: ['react-native', 'mobile', 'ios', 'android'],
                is_published: true,
                created_at: new Date('2024-12-05'),
                updated_at: new Date('2024-12-05'),
                created_by: admin._id
            }
        ];

        await Course.insertMany(courses);

        const lessons = [
            {
                id: '750e8400-e29b-41d4-a716-446655440001',
                course_id: '650e8400-e29b-41d4-a716-446655440001',
                title: 'Introduction to React',
                description: 'Learn what React is and why it is popular',
                video_url: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
                duration_minutes: 15,
                order_index: 1,
                is_free_preview: true,
                created_at: new Date('2024-12-05')
            },
            {
                id: '750e8400-e29b-41d4-a716-446655440002',
                course_id: '650e8400-e29b-41d4-a716-446655440001',
                title: 'Components and Props',
                description: 'Understand React components, props, and component composition.',
                video_url: 'https://www.youtube.com/embed/Y2hgEGPzTZY',
                duration_minutes: 20,
                order_index: 2,
                is_free_preview: false,
                created_at: new Date('2024-12-05')
            }
        ];

        await Lesson.insertMany(lessons);

        const batches = [
            {
                id: '850e8400-e29b-41d4-a716-446655440001',
                course_id: '650e8400-e29b-41d4-a716-446655440001',
                name: 'Batch 12 2024',
                start_date: new Date('2024-12-12'),
                end_date: new Date('2025-03-12'),
                max_students: 50,
                created_at: new Date('2024-12-05')
            }
        ];
        await Batch.insertMany(batches);

        const assignment = {
            id: '950e8400-e29b-41d4-a716-446655440001',
            course_id: '650e8400-e29b-41d4-a716-446655440001',
            lesson_id: '750e8400-e29b-41d4-a716-446655440002',
            title: 'Build a Todo App Component',
            description: 'Create a functional todo list component using React hooks. Submit your code via GitHub or CodeSandbox link.',
            due_date: new Date('2024-12-19'),
            max_score: 100,
            created_at: new Date('2024-12-05')
        };
        await Assignment.create(assignment);

        const quiz = {
            id: 'a50e8400-e29b-41d4-a716-446655440001',
            course_id: '650e8400-e29b-41d4-a716-446655440001',
            lesson_id: '750e8400-e29b-41d4-a716-446655440003',
            title: 'React State Management Quiz',
            description: 'Test your understanding of React state and lifecycle concepts.',
            passing_score: 70,
            time_limit_minutes: 15,
            created_at: new Date('2024-12-05')
        };
        await Quiz.create(quiz);

        const qquestions = [
            { id: 'b50e8400-e29b-41d4-a716-446655440001', quiz_id: quiz.id, question_text: 'What hook is used to manage state in functional components?', options: ['useContext', 'useState', 'useEffect', 'useReducer'], correct_answer: 'useState', points: 10, order_index: 1 },
            { id: 'b50e8400-e29b-41d4-a716-446655440002', quiz_id: quiz.id, question_text: 'When does the useEffect hook run by default?', options: ['Only on mount', 'After every render', 'Only on unmount', 'Never'], correct_answer: 'After every render', points: 10, order_index: 2 }
        ];
        await QuizQuestion.insertMany(qquestions);

        console.log('Seeding completed');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
