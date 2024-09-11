require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const projetoRoutes = require('./routes/projetos');  // Rotas de Projetos
const posteRoutes = require('./routes/postes');      // Rotas de Postes
const forcaRoutes = require('./routes/forcas');       // Rotas de Forças
const postesForcasRoutes = require('./routes/postes-forcas');    // Rota combinada

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

// Rotas
app.use('/api/projetos', projetoRoutes);  // Prefixo para rotas de projetos

app.use('/api/postes', posteRoutes);      // Prefixo para rotas de postes

app.use('/api/forcas', forcaRoutes); 

// Rota combinada para criar postes e forças
app.use('/api/postes-forcas', postesForcasRoutes);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
