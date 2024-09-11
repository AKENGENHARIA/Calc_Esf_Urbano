// routes/postes.js
const express = require('express');
const router = express.Router();
const posteController = require('../controllers/posteController');

// Rota para criar um novo poste
router.post('/', posteController.createPoste);

module.exports = router;
