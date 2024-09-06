// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'akcem',
  password: 'On@07031996',
  database: 'info_proj',
  port: 3306
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com ID ' + connection.threadId);
});

// Função para criar um novo usuário (registro)
app.post('/register', (req, res) => {
  const { email, senha } = req.body;

  console.log('Dados recebidos no servidor:', { email, senha }); // Verifique se os dados estão corretos

  connection.query('SELECT * FROM Usuarios WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Erro ao verificar email:', error);
      return res.status(500).json({ message: 'Erro no servidor ao verificar email' });
    }

    console.log('Resultados da verificação de e-mail:', results);

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já registrado' });
    }

    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) {
        console.error('Erro ao criptografar a senha:', err);
        return res.status(500).json({ message: 'Erro ao criptografar a senha' });
      }

      connection.query('INSERT INTO Usuarios (email, senha) VALUES (?, ?)', [email, hash], (error, results) => {
        if (error) {
          console.error('Erro ao inserir usuário no banco:', error);
          return res.status(500).json({ message: 'Erro ao inserir usuário no banco' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso', success: true });
      });
    });
  });
});


// Função para autenticação de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  connection.query('SELECT * FROM Usuarios WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erro no servidor ao verificar o usuário' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];

    bcrypt.compare(senha, user.senha, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao comparar a senha' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.SECRET_KEY, { expiresIn: '30d' });

      connection.query('INSERT INTO Sessoes (id_usuario, token, data_expiracao) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))',
        [user.id_usuario, token], (error, results) => {
          if (error) {
            return res.status(500).json({ message: 'Erro ao registrar a sessão' });
          }
          res.status(200).json({ token });
        });
    });
  });
});

app.listen(7777, () => {
  console.log('Servidor rodando na porta 7777');
});
