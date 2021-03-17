const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');
const authController = require('../controllers/auth.controller');

// Middleware
const {restrict} = require('../middlewares/restrict');

// router.get('/', apiController.apiIndex);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/whoami', restrict, authController.whoami);
router.post('/create-room', restrict, apiController.createRoom);
router.get('/players', restrict, apiController.getAllPlayers);
router.post('/players/create', restrict, apiController.createPlayer);
router.get('/players/:id', restrict, apiController.getPlayerById);
router.put('/players/update/:id', restrict, apiController.updatePlayer);
router.delete('/players/delete/:id', restrict, apiController.deletePlayer);

module.exports = router;
