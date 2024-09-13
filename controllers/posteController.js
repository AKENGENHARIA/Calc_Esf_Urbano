import db from '../db.mjs'; // Certifique-se de que está importando o arquivo de configuração do banco de dados

export const createPoste = (req, res) => {
  const { numeroPoste, tipoPoste, altura, capacidade, projetoId } = req.body;

  if (!numeroPoste || !tipoPoste || !altura || !capacidade || !projetoId) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  const sql = "INSERT INTO postes (numeroPoste, tipoPoste, altura, capacidade, projetoId) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [numeroPoste, tipoPoste, altura, capacidade, projetoId], (err, result) => {
    if (err) {
      console.error("Erro ao criar poste:", err); // Adiciona log no console para depuração
      return res.status(500).json({ success: false, message: "Erro ao criar poste.", error: err });
    }
    res.status(201).json({ success: true, message: "Poste criado com sucesso!", id: result.insertId });
  });
};


// Função interna usada na rota combinada
export const createPosteInternal = ({ numeroPoste, tipoPoste, altura, capacidade, projetoId }) => {
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

