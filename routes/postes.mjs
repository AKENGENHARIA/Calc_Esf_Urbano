
import express from 'express'; // Correção da importação
<<<<<<< Updated upstream
import { createPoste } from '../controllers/posteController.js'; // Certifique-se de incluir a extensão '.js'
=======
import {
    getUltimoPostePorProjeto
 } from '../controllers/posteController.mjs'; // Certifique-se de incluir a extensão '.js'
>>>>>>> Stashed changes

const router = express.Router();

// Rota para criar um novo poste
<<<<<<< Updated upstream
router.post("/novo-poste", createPoste);
=======
//router.post("/criar", createPoste);
// Rota para obter o último poste de um projeto
router.get('/ultimo-poste', getUltimoPostePorProjeto);

>>>>>>> Stashed changes

export default router;
