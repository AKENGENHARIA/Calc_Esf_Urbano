import db from '../db.js';  // Supondo que você esteja usando um arquivo db.js

// Função para obter um projeto pelo ID
export const getProjetoById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM projetos WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar projeto" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }
    res.json(results[0]);
  });
};

// Função para criar um novo projeto
export const createProjeto = (req, res) => {
  const { nome_projeto, cidade, empresa, concessionaria, status } = req.body;
  const sql = "INSERT INTO projetos (nome_projeto, cidade, empresa, concessionaria, status) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nome_projeto, cidade, empresa, concessionaria, status], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao criar projeto" });
    }
    res.status(201).json({ success: true, message: "Projeto criado com sucesso", id: results.insertId });
  });
};

// Função para atualizar um projeto existente
export const updateProjeto = (req, res) => {
  const { id } = req.params;
  const { nome_projeto, cidade, empresa, concessionaria, status } = req.body;
  const sql = "UPDATE projetos SET nome_projeto = ?, cidade = ?, empresa = ?, concessionaria = ?, status = ? WHERE id = ?";
  db.query(sql, [nome_projeto, cidade, empresa, concessionaria, status, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar projeto" });
    }
    res.status(200).json({ success: true, message: "Projeto atualizado com sucesso!" });
  });
};

// Função para deletar um projeto
export const deleteProjeto = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM projetos WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar projeto" });
    }
    res.json({ message: "Projeto deletado com sucesso" });
  });
};