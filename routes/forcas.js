// routes/forcas.js
const express = require('express');
const router = express.Router();
const forcaController = require('../controllers/forcaController');

// Rota para criar uma nova força
router.post('/', forcaController.createForca);

module.exports = router;
