const express = require('express');
const path = require('path'); // Necessário para lidar com os caminhos
const app = express();
const mysql = require('mysql2');
const port = 3000;

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',    // Substitua pelo host do seu banco de dados
    user: 'ak',   // Substitua pelo usuário do banco de dados
    password: '123Mudar', // Substitua pela sua senha do banco de dados
    database: 'info_proj' // Substitua pelo nome do banco de dados
});

// Verificar conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso!');
});

// Rota para a API /consultar (busca de projetos)
app.get('/consultar', (req, res) => {
    const searchQuery = req.query.search || '';
    const status = req.query.status || '';
    const sortColumn = req.query.sortColumn || 'nome_projeto';
    const sortDirection = req.query.sortDirection === 'desc' ? 'DESC' : 'ASC';
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    // Montar a consulta SQL com filtro, ordenação e paginação
    let sql = `
        SELECT SQL_CALC_FOUND_ROWS id, nome_projeto, cidade, empresa, concessionaria, status
        FROM projetos
        WHERE (cidade LIKE ? OR empresa LIKE ? OR concessionaria LIKE ? OR nome_projeto LIKE ?)
    `;

    const values = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`];

    // Se o status for passado, adiciona à query SQL e ao array de valores
    if (status) {
        sql += ` AND status = ?`;
        values.push(status); // Adiciona o status ao array de valores
    }

    sql += ` ORDER BY ${sortColumn} ${sortDirection} LIMIT ? OFFSET ?`;

    // Adiciona pageSize e offset aos valores
    values.push(pageSize, offset);

    // Executa a consulta no banco de dados
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erro ao buscar projetos (detalhe do erro):', error);  // Log do erro completo
            res.status(500).json({ error: 'Erro ao buscar projetos.' });
            return;
        }

        // Consulta o número total de projetos para paginação
        connection.query('SELECT FOUND_ROWS() as total', (err, totalResults) => {
            if (err) {
                console.error('Erro ao buscar total de projetos (detalhe do erro):', err);  // Log do erro completo
                res.status(500).json({ error: 'Erro ao buscar total de projetos.' });
                return;
            }

            // Enviar os dados de volta para o front-end
            res.json({
                projetos: results,
                totalPages: Math.ceil(totalResults[0].total / pageSize)
            });
        });
    });
});


// Serve arquivos estáticos (como o dashboard.html)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
