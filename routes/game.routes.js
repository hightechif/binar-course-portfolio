// Import Module
const express = require('express');
const router = express.Router({caseSensitive: false});
const gameController = require('../controllers/game.controller');

router.get('/', gameController.showGamePage);

module.exports = router;
