
import { getUltimoPostePorProjeto, concluirProjeto,getAllProjetos,getProjetoById, createProjeto, updateProjeto, deleteProjeto } from '../controllers/projetoController.js';  // Importação correta

import express from 'express';
const router = express.Router();

// Rota para obter todos os projetos
router.get('/consultar', getAllProjetos);

// Rota para obter um projeto pelo ID
router.get('/:id', getProjetoById);

// Rota para criar um novo projeto
router.post('/novo', createProjeto);

// Rota para atualizar um projeto existente
router.put('/:id', updateProjeto);

// Rota para deletar um projeto
router.delete('/:id', deleteProjeto);

// Rota para editar um projeto existente
router.put('/editar-projeto/:id', updateProjeto);

// Rota para concluir um projeto (atualizar o status para 'finalizado')
router.post('/concluir-projeto/:id', concluirProjeto);

// Rota para obter o último poste salvo de um projeto específico
router.get('/:projetoId/ultimo-poste',getUltimoPostePorProjeto);

// Rota para excluir um projeto pelo ID
router.delete('/excluir-projeto/:id', deleteProjeto);

export default router;
