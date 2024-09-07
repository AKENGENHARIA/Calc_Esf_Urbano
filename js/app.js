const express = require('express');
const mysql = require('mysql2');  // Ou o pacote correto para conexão com MySQL

const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados usando as variáveis do .env
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});


db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND senha = ?';
    
    db.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }
        if (results.length > 0) {
            res.json({ token: 'jwt_token_simulado' });  // Gerar o JWT real aqui
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
