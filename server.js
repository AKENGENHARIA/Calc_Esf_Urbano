import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import projetoRoutes from './routes/projetos.js';  // Certifique-se de adicionar .js
import posteRoutes from './routes/postes.js';
import forcaRoutes from './routes/forcas.js';
import postesForcasRoutes from './routes/postes-forcas.js';

const app = express();
const port = process.env.PORT || 3000;

// Configuração do banco de dados MySQL
const db = mysql.createConnection(process.env.DATABASE_URL);


// Conexão ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Sai do processo se não conseguir conectar
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Injeta a conexão do banco de dados nas rotas
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Rotas
app.use('/api/projetos', projetoRoutes);
app.use('/api/postes', posteRoutes);
app.use('/api/forcas', forcaRoutes);
app.use('/api/postes-forcas', postesForcasRoutes);

// Servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
