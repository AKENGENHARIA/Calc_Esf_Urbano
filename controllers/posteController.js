const db = require('../db');  // Certifique-se de que está se conectando corretamente ao banco de dados

exports.criarPoste = (req, res) => {
    const { numeroPoste, tipoPoste, altura, capacidade, projetoId } = req.body;

    // Query SQL para inserir um novo poste no banco de dados
    const sql = 'INSERT INTO postes (numero_Poste, tipo_Poste, altura, capacidade, projeto_Id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [numeroPoste, tipoPoste, altura, capacidade, projetoId], (err, result) => {
        if (err) {
            console.error('Erro ao inserir o poste:', err);
            return res.status(500).json({ success: false, message: 'Erro ao criar o poste.' });
        }
        res.status(201).json({ success: true, message: 'Poste criado com sucesso!' });
    });
};
