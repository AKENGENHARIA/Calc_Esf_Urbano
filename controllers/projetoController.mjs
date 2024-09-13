import db from '../db.mjs';  // Supondo que você esteja usando um arquivo db.js

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
export const createProjeto = async (req, res) => {
  const { nome_projeto, cidade, empresa, concessionaria, status } = req.body;
  
  // Verificar se todos os campos necessários estão presentes
  if (!nome_projeto || !cidade || !empresa || !concessionaria || !status) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
      // Inserir o projeto no banco de dados
      const [result] = await db.query(
          'INSERT INTO projetos (nome_projeto, cidade, empresa, concessionaria, status) VALUES (?, ?, ?, ?, ?)',
          [nome_projeto, cidade, empresa, concessionaria, status]
      );

      // Retornar sucesso e o ID do projeto criado
      res.status(201).json({ success: true, message: 'Projeto criado com sucesso', id: result.insertId });
  } catch (error) {
      console.error('Erro ao criar projeto:', error);
      res.status(500).json({ error: 'Erro ao criar projeto.' });
  }
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

// Função para buscar todos os projetos
export const getAllProjetos = (req, res) => {
  const sql = "SELECT * FROM projetos";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar projetos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Nenhum projeto encontrado" });
    }
    res.json(results);
  });
};

// Função para atualizar o status de um projeto para 'finalizado'
export const concluirProjeto = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE projetos SET status = 'finalizado' WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao concluir projeto." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }
    res.status(200).json({ success: true, message: "Projeto concluído com sucesso!" });
  });
};
// Função para obter o último poste salvo de um projeto específico
export const getUltimoPostePorProjeto = (req, res) => {
  const { projetoId } = req.params;
  const sql = "SELECT * FROM postes WHERE projetoId = ? ORDER BY id DESC LIMIT 1";

  db.query(sql, [projetoId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar o último poste." });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Nenhum poste encontrado para este projeto." });
    }
    res.json(results[0]); // Retorna o último poste encontrado
  });
};
