const functions = require("firebase-functions");
const mysql = require("mysql2");

// Usando variáveis de ambiente do Firebase
const db = mysql.createConnection({
  host: functions.config().railway.host,          // Host da sua URL pública
  user: functions.config().railway.user,          // Usuário root da URL pública
  password: functions.config().railway.password,  // Senha da URL pública
  database: functions.config().railway.database,  // Nome do banco de dados (railway)
  port: functions.config().railway.port           // Porta do banco de dados (27494)
});

// Exemplo de função para acessar dados do banco de dados
exports.getDataFromDatabase = functions.https.onRequest((req, res) => {
  db.query("SELECT * FROM minha_tabela", (error, results) => {
    if (error) {
      console.error("Erro ao consultar o banco de dados:", error);
      res.status(500).send("Erro no banco de dados");
    } else {
      res.status(200).json(results);
    }
  });
});
