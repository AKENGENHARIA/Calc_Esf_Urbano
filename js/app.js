// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config(); 

const express = require('express');  // Importar o Express
const app = express();               // Criar a instância do app

const mysql = require('mysql2');

// Definir a porta
const PORT = process.env.PORT || 3000;

// Configuração da conexão usando variáveis de ambiente
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'ak',
  password: process.env.MYSQL_PASSWORD || '123Mudar',
  database: process.env.MYSQL_DATABASE || 'info_proj',
  port: process.env.MYSQL_PORT || 3306
});

// Testar a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com ID ' + connection.threadId);
});

// Definir uma rota para testar
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Rota para buscar dados do banco de dados
// Rota para listar as tabelas do banco de dados
app.get('/tabelas', (req, res) => {
    connection.query('SHOW TABLES', (err, results) => {
      if (err) {
        console.error('Erro ao buscar tabelas:', err);
        res.status(500).send('Erro ao buscar tabelas');
        return;
      }
      console.log('Tabelas encontradas:', results);
      res.json(results);  // Envia os resultados como JSON
    });
  });
  app.get('/teste', (req, res) => {
    connection.query('SELECT 1 + 1 AS solution', (err, results) => {
      if (err) {
        console.error('Erro ao executar teste:', err);
        res.status(500).send('Erro ao executar teste');
        return;
      }
      console.log('Resultado do teste:', results);
      res.json(results);  // Envia os resultados como JSON
    });
  });
  