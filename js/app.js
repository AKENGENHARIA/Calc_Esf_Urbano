const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json()); // Para lidar com JSON no corpo das requisições

// Configuração da conexão com o banco de dados MySQL
const mysql = require('mysql2');

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',           // O servidor MySQL está rodando localmente
  user: 'root',                // Usuário do MySQL
  password: 'On@07031996',     // Senha do MySQL
  database: 'info_proj',       // Nome do banco de dados
  port: 3306                   // Porta padrão do MySQL
});

// Conectar ao MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com ID ' + connection.threadId);
});


// Função para criar um novo usuário (registro)
app.post('/register', (req, res) => {
  const { email, senha } = req.body;
  
  // Verifica se o email já está registrado
  connection.query('SELECT * FROM Usuarios WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erro no servidor ao verificar email' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já registrado' });
    }

    // Criptografa a senha
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criptografar a senha' });
      }

      // Insere o novo usuário no banco
      connection.query('INSERT INTO Usuarios (email, senha) VALUES (?, ?)', [email, hash], (error, results) => {
        if (error) {
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

  // Verifica se o usuário existe
  connection.query('SELECT * FROM Usuarios WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erro no servidor ao verificar o usuário' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];

    // Verifica a senha com bcrypt
    bcrypt.compare(senha, user.senha, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao comparar a senha' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      // Gera o token JWT (expiração de 30 dias)
      const token = jwt.sign({ id_usuario: user.id_usuario }, 'secreta_chave_token', { expiresIn: '30d' });

      // Insere a sessão no banco de dados
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

// Porta para o servidor rodar
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
