import functions from 'firebase-functions';
import mysql from 'mysql2/promise';  // Usando a versão com promessas do mysql2

// Usando variáveis de ambiente do Firebase para configurar a conexão
const dbConfig = {
  host: functions.dbConfig().railway.host,
  user: functions.dbConfig().railway.user,
  password: functions.dbConfig().railway.password,
  database: functions.dbConfig().railway.database,
  port: functions.dbConfig().railway.port,
};

// Função para testar a conexão ao banco de dados
export const testDatabaseConnection = functions.https.onRequest(async (req, res) => {
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
