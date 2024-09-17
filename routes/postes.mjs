
import express from 'express'; // Correção da importação
import { createPoste } from '../controllers/posteController.js'; // Certifique-se de incluir a extensão '.js'

const router = express.Router();

// Rota para criar um novo poste
router.post("/novo-poste", createPoste);

export default router;
