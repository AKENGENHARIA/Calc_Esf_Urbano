import mysql from 'mysql2';

// Defina manualmente os valores de configuração aqui
const connectionConfig = {
    host: 'junction.proxy.rlwy.net',  // Coloque aqui o host do banco de dados
    user: 'root',                      // Coloque aqui o usuário
    password: 'gXpcxqgczzShiILURRhvfHERFlTtrnfz',  // Coloque aqui a senha
    database: 'railway',               // Coloque aqui o nome do banco de dados
    port: 27494,                       // Coloque aqui a porta
};

// Criação da conexão com o banco de dados MySQL
const db = mysql.createConnection(connectionConfig);

// Conectando ao banco de dados
db.query('SELECT DATABASE() AS db;', (err, results) => {
    if (err) {
        console.error('Erro ao verificar banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados:', results[0].db);
    }
});

export default db;
