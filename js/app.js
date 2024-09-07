const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 10000  // Tempo de timeout em milissegundos (10 segundos)
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com ID ' + connection.threadId);
});

// Função para autenticação de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  connection.query('SELECT * FROM Usuarios WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erro no servidor ao verificar o usuário' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];

    bcrypt.compare(senha, user.senha, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao comparar a senha' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.SECRET_KEY, { expiresIn: '30d' });

      connection.query('INSERT INTO Sessoes (id_usuario, token, data_expiracao) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))',
        [user.id_usuario, token], (error, results) => {
          if (error) {
            return res.status(500).json({ message: 'Erro ao registrar a sessão' });
          }
          res.status(200).json({ token });
        });
    });
  });
});

// Definir a porta dinamicamente para produção
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
