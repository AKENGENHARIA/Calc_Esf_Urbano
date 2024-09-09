const express = require('express');
const app = express();
const port = 3000;

// Rota para a API /consultar
app.get('/consultar', (req, res) => {
    // Sua lógica aqui
    res.json({ message: 'Consulta bem-sucedida!' });
});

// Serve arquivos estáticos (como o dashboard.html)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
