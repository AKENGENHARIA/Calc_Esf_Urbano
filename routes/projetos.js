const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');  // Certifique-se de que o caminho está correto

// Rota para obter todos os projetos
router.get('/consultar', projetoController.getAllProjetos);

// Rota para obter um projeto pelo ID
router.get('/:id', projetoController.getProjetoById);

// Rota para criar um novo projeto
router.post('/', projetoController.createProjeto);

// Rota para atualizar um projeto existente
router.put('/:id', projetoController.updateProjeto);

// Rota para deletar um projeto
router.delete('/:id', projetoController.deleteProjeto);

// Rota para editar um projeto existente
router.put('/editar-projeto/:id', projetoController.updateProjeto);

module.exports = router;
