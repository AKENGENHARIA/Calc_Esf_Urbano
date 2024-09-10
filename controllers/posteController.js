const db = require('../db');  // Certifique-se de que está se conectando corretamente ao banco de dados

exports.criarPoste = (req, res) => {
    const { numeroPoste, tipoPoste, altura, capacidade, projetoId } = req.body;

    // Verificar se já existe um poste com o mesmo número para o projeto
    const verificarPosteQuery = 'SELECT * FROM postes WHERE numeroPoste = ? AND projetoId = ?';

    db.query(verificarPosteQuery, [numeroPoste, projetoId], (err, results) => {
        if (err) {
            console.error('Erro ao verificar se o poste já existe:', err);
            return res.status(500).json({ success: false, message: 'Erro ao verificar o poste' });
        }

        if (results.length > 0) {
            // Se já existe um poste com o mesmo número no projeto
            return res.status(400).json({ success: false, message: 'Já existe um poste com este número neste projeto.' });
        }

        // Se o número do poste ainda não foi usado, prosseguir com a criação
        const criarPosteQuery = `
            INSERT INTO postes (numeroPoste, tipoPoste, altura, capacidade, projetoId) 
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(criarPosteQuery, [numeroPoste, tipoPoste, altura, capacidade, projetoId], (err, result) => {
            if (err) {
                console.error('Erro ao inserir o poste:', err);
                return res.status(500).json({ success: false, message: 'Erro ao inserir o poste.' });
            }

            res.status(201).json({ success: true, message: 'Poste criado com sucesso!', data: result });
        });
    });
};