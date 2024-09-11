const db = require('../db');



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
        // Certifique-se de que a resposta é JSON
        res.status(201).json({ success: true, message: 'Projeto criado com sucesso', id: results.insertId });
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


// Função para buscar projetos com base em parâmetros de pesquisa e status
exports.buscarProjetos = (req, res) => {
    const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '';  // Verifica se há parâmetro 'search'
    const status = req.query.status ? req.query.status.toLowerCase() : '';  // Verifica se há parâmetro 'status'

    // Base da query SQL
    let sql = 'SELECT * FROM projetos WHERE 1=1';
    let queryParams = [];

    // Se houver parâmetros de busca, adiciona os filtros
    if (search) {
        sql += ` AND (LOWER(nome_projeto) LIKE ? OR LOWER(cidade) LIKE ? OR LOWER(empresa) LIKE ? OR LOWER(concessionaria) LIKE ?)`;
        queryParams.push(search, search, search, search);
    }

    if (status) {
        sql += ` AND LOWER(status) = ?`;
        queryParams.push(status);
    }

    // Executa a query e retorna os projetos
    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Erro ao buscar projetos:', err);
            return res.status(500).json({ message: 'Erro ao buscar projetos.' });
        }

        res.status(200).json({ projetos: results });
    });
};

// Controlador para atualizar o status de um projeto para "finalizado"
exports.concluirProjeto = (req, res) => {
    const projetoId = req.params.id;

    // Query SQL para atualizar o status do projeto para 'finalizado'
    const sql = 'UPDATE projetos SET status = ? WHERE id = ?';
    const queryParams = ['finalizado', projetoId];  // Define os parâmetros da query (status 'finalizado' e o ID do projeto)

    // Executa a query para atualizar o status
    db.query(sql, queryParams, (err, result) => {
        if (err) {
            console.error('Erro ao concluir projeto:', err);
            return res.status(500).json({ message: 'Erro ao concluir o projeto.' });
        }

        // Verifica se a atualização afetou alguma linha (projeto existente)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Projeto não encontrado.' });
        }

        // Retorna sucesso
        res.status(200).json({ success: true, message: 'Projeto concluído com sucesso!' });
    });
};

// Função para buscar o último poste de um projeto específico
exports.getUltimoPostePorProjeto = (req, res) => {
    const { projetoId } = req.params; // Obter o projetoId dos parâmetros da rota

    const query = 'SELECT numeroPoste FROM postes WHERE projetoId = ? ORDER BY id DESC LIMIT 1';

    db.query(query, [projetoId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o último poste do projeto:', err);
            return res.status(500).json({ success: false, message: 'Erro ao buscar o último poste do projeto.' });
        }

        if (results.length > 0) {
            res.json({ success: true, numeroPoste: results[0].numeroPoste });
        } else {
            // Se nenhum poste estiver salvo para esse projeto, iniciar a contagem de postes com 1
            res.json({ success: true, numeroPoste: 1 });
        }
    });
};

// Função para excluir um projeto
exports.deleteProjeto = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM projetos WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao excluir o projeto' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Projeto não encontrado' });
        }
        res.status(200).json({ success: true, message: 'Projeto excluído com sucesso' });
    });
};



