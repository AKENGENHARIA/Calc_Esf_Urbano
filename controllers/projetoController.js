const db = require('../db');

// Função para obter todos os projetos
exports.getAllProjetos = (req, res) => {
    const sql = 'SELECT * FROM projetos';  // Supondo que a tabela se chama "projetos"
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar projetos' });
        }
        res.json({ projetos: results });  // Retorna os projetos em formato JSON
    });
};

// Função para obter um projeto pelo ID
exports.getProjetoById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM projetos WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar projeto' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        res.json(results[0]);
    });
};

// Função para criar um novo projeto
exports.createProjeto = (req, res) => {
    const { nome_projeto, cidade, empresa, concessionaria, status } = req.body;
    const sql = 'INSERT INTO projetos (nome_projeto, cidade, empresa, concessionaria, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome_projeto, cidade, empresa, concessionaria, status], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar projeto' });
        }
        res.status(201).json({ message: 'Projeto criado com sucesso', id: results.insertId });
    });
};

// Função para atualizar um projeto existente
exports.updateProjeto = (req, res) => {
    const { id } = req.params;
    const { nome_projeto, cidade, empresa, concessionaria, status } = req.body;
    const sql = 'UPDATE projetos SET nome_projeto = ?, cidade = ?, empresa = ?, concessionaria = ?, status = ? WHERE id = ?';
    db.query(sql, [nome_projeto, cidade, empresa, concessionaria, status, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar projeto' });
        }
        res.status(200).json({ success: true, message: 'Projeto atualizado com sucesso!' });
    });
};

// Função para deletar um projeto
exports.deleteProjeto = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM projetos WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar projeto' });
        }
        res.json({ message: 'Projeto deletado com sucesso' });
    });
};
