const db = require('../db'); // Certifique-se de que o arquivo de configuração do banco de dados esteja configurado corretamente

// Função para criar uma nova força
// Função para salvar uma nova força
exports.createForca = (req, res) => {
    const { poste_Id, vao, angulo, rede_mt, rede_bt, nivel_cruzeta_mt, estaio, uso_mutuo } = req.body;

    const sql = `INSERT INTO forcas (poste_Id, vao, angulo, rede_mt, rede_bt, nivel_cruzeta_mt, estaio, uso_mutuo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [poste_Id, vao, angulo, rede_mt, rede_bt, nivel_cruzeta_mt, estaio, uso_mutuo], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao salvar a força.', error: err });
        }
        res.status(201).json({ success: true, message: 'Força salva com sucesso.' });
    });
};

