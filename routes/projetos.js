const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');  // Certifique-se de que o caminho está correto
const posteController = require('../controllers/posteController');  // Adicione o controller para postes

// Rota para obter todos os projetos
router.get('/consultar', projetoController.buscarProjetos);

// Rota para obter um projeto pelo ID
router.get('/:id', projetoController.getProjetoById);

// Rota para criar um novo projeto
router.post('/novo', projetoController.createProjeto);

// Rota para atualizar um projeto existente
router.put('/:id', projetoController.updateProjeto);

// Rota para deletar um projeto
router.delete('/:id', projetoController.deleteProjeto);

// Rota para editar um projeto existente
router.put('/editar-projeto/:id', projetoController.updateProjeto);

// Rota para concluir um projeto (atualizar o status para 'finalizado')
router.post('/concluir-projeto/:id', projetoController.concluirProjeto);

// Rota para obter o último poste salvo de um projeto específico
router.get('/:projetoId/ultimo-poste', projetoController.getUltimoPostePorProjeto);

// Rota para excluir um projeto pelo ID
router.delete('/excluir-projeto/:id', projetoController.deleteProjeto);


module.exports = router;
