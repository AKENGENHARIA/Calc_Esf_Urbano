require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Configurando o middleware para receber JSON
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

app.use(express.json());  // Middleware para interpretar JSON
app.use(cors());  // Permitir requisições de qualquer origem (CORS)

// Rotas para os projetos
const projetoRoutes = require('./routes/projetos');
app.use('/api/projetos', projetoRoutes);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
