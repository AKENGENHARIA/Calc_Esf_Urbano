import mysql from 'mysql2';
import dotenv from 'dotenv';
import functions from 'firebase-functions';
import { parse } from 'url';  // Usado para decompor a DATABASE_URL

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

let connectionConfig;

if (process.env.DATABASE_URL) {
    const dbUrl = new URL(process.env.DATABASE_URL); // Use a URL para decompor a DATABASE_URL
    connectionConfig = {
        host: dbUrl.hostname,
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.replace('/', ''), // Remove a barra inicial
        port: dbUrl.port,
    };
} else {
    // Se a DATABASE_URL não estiver definida, usar as variáveis individuais
    connectionConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
    };
}

// Criação da conexão com o banco de dados MySQL
const db = mysql.createConnection(connectionConfig);

// Conectando ao banco de dados
// Após conectar ao banco de dados
db.query('SELECT DATABASE() AS db;', (err, results) => {
    if (err) {
        console.error('Erro ao verificar banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados:', results[0].db);
    }
});


export default db;
