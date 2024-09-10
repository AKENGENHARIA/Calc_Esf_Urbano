const express = require('express');
const router = express.Router();
const posteController = require('../controllers/posteController');  // Certifique-se de que o caminho está correto

// Rota para criar um novo poste
router.post('/', posteController.criarPoste);

// Outras rotas para postes podem ser adicionadas aqui

module.exports = router;
