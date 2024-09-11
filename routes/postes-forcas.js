// routes/postes-forcas.js
const express = require('express');
const router = express.Router();
const posteController = require('../controllers/posteController');
const forcaController = require('../controllers/forcaController');

// Rota combinada para salvar tanto o poste quanto as forças
router.post('/', async (req, res) => {
    try {
        const { numeroPoste, tipoPoste, altura, capacidade, projetoId, forcas } = req.body;

        if (!forcas || forcas.length === 0) {
            return res.status(400).json({ success: false, message: 'Nenhuma força foi fornecida.' });
        }

        // Salva o poste
        const posteResult = await posteController.createPosteInternal({
            numeroPoste,
            tipoPoste,
            altura,
            capacidade,
            projetoId
        });

        const posteId = posteResult.id;

        // Salva as forças associadas ao poste
        for (const forca of forcas) {
            await forcaController.createForcaInternal({ ...forca, posteId });
        }

        res.status(201).json({ success: true, message: 'Poste e forças salvos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao salvar poste e forças.', error });
    }
});

module.exports = router;
