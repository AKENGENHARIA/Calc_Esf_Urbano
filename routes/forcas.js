const express = require('express');
const router = express.Router();
const forcaController = require('../controllers/forcaController');

// Rota para criar uma nova força
router.post('/forcas', forcaController.createForca);

module.exports = router;
