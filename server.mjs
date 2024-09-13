import mysql from 'mysql2';

// Definindo manualmente a URL do banco de dados
const dbUrl = new URL('mysql://root:gXpcxqgczzShiILURRhvfHERFlTtrnfz@junction.proxy.rlwy.net:27494/railway');

// Configurações da conexão
const connectionConfig = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''), // Remove a barra inicial
    port: dbUrl.port,
};

// Criação da conexão com o banco de dados MySQL
const db = mysql.createConnection(connectionConfig);

// Função para conectar e testar a conexão
function connectToDatabase() {
    db.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            setTimeout(connectToDatabase, 5000); // Tentar reconectar após 5 segundos
        } else {
            console.log('Conectado ao banco de dados');
        }
    });
}

// Verifica se a conexão continua ativa
db.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Conexão com o banco de dados foi perdida. Reconectando...');
        connectToDatabase();
    } else {
        throw err;
    }
});

// Testando a conexão ao banco de dados
db.query('SELECT DATABASE() AS db;', (err, results) => {
    if (err) {
        console.error('Erro ao verificar banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados:', results[0].db);
    }
});

export default db;
