<<<<<<< Updated upstream
import express from 'express';
import cors from 'cors';
import router from './routes/projetos.mjs';
=======
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
>>>>>>> Stashed changes

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Extrai as partes da URL do banco de dados
const dbUrl = new URL(process.env.DATABASE_URL);

// Configuração de conexão com o banco de dados
const connectionConfig = {
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),  // Remove a barra inicial do nome do banco
  port: dbUrl.port,
};

// Cria a conexão com o MySQL
const db = await mysql.createConnection(connectionConfig);

console.log('Conexão com o banco de dados estabelecida');

export default db;
