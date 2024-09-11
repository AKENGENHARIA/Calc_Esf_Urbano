// posteController.js
const db = require('../db');

// Função para criar um poste
exports.createPoste = (req, res) => {
    const { numeroPoste, tipoPoste, altura, capacidade, projetoId } = req.body;
    const sql = `INSERT INTO postes (numeroPoste, tipoPoste, altura, capacidade, projetoId) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [numeroPoste, tipoPoste, altura, capacidade, projetoId], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao criar poste.', error: err });
        }
        res.status(201).json({ success: true, message: 'Poste criado com sucesso!', id: result.insertId });
    });
};

// Função interna usada na rota combinada
exports.createPosteInternal = ({ numeroPoste, tipoPoste, altura, capacidade, projetoId }) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO postes (numeroPoste, tipoPoste, altura, capacidade, projetoId)
                     VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [numeroPoste, tipoPoste, altura, capacidade, projetoId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve({ id: result.insertId });
        });
    });
};
