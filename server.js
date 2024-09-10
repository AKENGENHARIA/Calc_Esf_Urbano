require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const projetoRoutes = require('./routes/projetos');  // Rotas de Projetos
const posteRoutes = require('./routes/postes');  // Rotas de Postes (Novo)
const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar o CORS
app.use(cors());

// Middleware para receber JSON
app.use(express.json());

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Conexão ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Testar conexão ao banco de dados MySQL
db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Erro ao se comunicar com o banco de dados:', err);
    } else {
        console.log('Banco de dados conectado com sucesso! Resultado do teste:', results[0].solution);
    }
});

// Use as rotas do arquivo 'projetos.js'
app.use('/api/projetos', projetoRoutes);  // Isso registra o prefixo '/api/projetos'

// Use as rotas do arquivo 'postes.js'
app.use('/api/postes', posteRoutes);  // Novo: Rotas para postes

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
