import functions from 'firebase-functions';
import admin from 'firebase-admin';
import mysql from 'mysql2/promise';
import cors from 'cors';
import express from 'express';

// Inicializa o Firebase Admin (necessário para algumas funções)
admin.initializeApp();

// Configuração do banco de dados
const dbConfig = {
  host: 'junction.proxy.rlwy.net',
  user: 'root',
  password: 'gXpcxqgczzShiILURRhvfHERFlTtrnfz',
  database: 'railway',
  port: 27494
};

// Criação do app Express
const app = express();

// Configuração do CORS para permitir todas as origens
app.use(cors({ origin: true }));

// Função de rota para testar a conexão ao banco de dados
app.get('/testDatabaseConnection', async (req, res) => {
  let connection;
  try {
    // Criar uma nova conexão ao banco de dados
    connection = await mysql.createConnection(dbConfig);

    // Executar uma query simples para testar a conexão
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');

    // Retornar o resultado da query
    res.status(200).send(`A solução é: ${rows[0].solution}`);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).send('Erro ao conectar ao banco de dados.');
  } finally {
    if (connection) {
      // Fechar a conexão quando o teste estiver concluído
      await connection.end();
    }
  }
});

// Exportando a função do Firebase para o deploy
export const apiV2 = functions.https.onRequest(app);
