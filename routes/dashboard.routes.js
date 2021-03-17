// Import Module
const express = require('express');
const methodOverride = require('method-override');
const router = express.Router({caseSensitive: false});
const dashboardController = require('../controllers/dashboard.controller');

// Middleware
router.use(methodOverride('_method'));
const {restrict} = require('../middlewares/restrict');

// Routing
router.get('/', dashboardController.showDashboardPage); // main dashboard route
router.post('/login', dashboardController.loginHandler); // Login Handler
router.get('/users', dashboardController.showUsersData); // READ database using GET /users
router.get('/create', dashboardController.showCreatePage); // GET create page for POST /users/create
router.post('/users/create', dashboardController.createNewUser); // CREATE database using POST /users/create
router.get('/users/:id', dashboardController.showSingleUserData); // READ database using GET /users/:id
router.get('/users/update/:id', dashboardController.showUpdatePage); // GET create page for POST /users/create
router.put('/users/update/:id', dashboardController.updateUser); // UPDATE databse using PUT /users/:id
router.delete('/users/:id', dashboardController.deleteUser); // DELETE database using DELETE /users/:id

module.exports = router;
