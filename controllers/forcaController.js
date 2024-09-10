const db = require('../db'); // Certifique-se de que o arquivo de configuração do banco de dados esteja configurado corretamente

// Função para criar uma nova força
exports.createForca = (req, res) => {
    const { vao, angulo, redeMt, redeBt, nivelCruzeta, estaio, usoMutuo, posteId } = req.body;

    if (!vao || !angulo || !redeMt || !redeBt || !nivelCruzeta || !estaio || !usoMutuo || !posteId) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO forcas (vao, angulo, rede_mt, rede_bt, nivel_cruzeta_mt, estaio, uso_mutuo, poste_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [vao, angulo, redeMt, redeBt, nivelCruzeta, estaio, usoMutuo, posteId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir a força:', err);
            return res.status(500).json({ success: false, message: 'Erro ao salvar a força.' });
        }

        res.status(201).json({ success: true, message: 'Força salva com sucesso!' });
    });
};
