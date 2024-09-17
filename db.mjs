import express from 'express';
import cors from 'cors';
import router from './routes/projetos.mjs';

const app = express();

// Configuração de CORS para permitir o frontend acessar a API
app.use(cors({
   origin: 'https://akraquercem.web.app',  // Adicione o domínio correto do seu frontend aqui
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

// Configura o roteamento com o caminho /api/projetos
app.use('/api/projetos', router);

// Define a porta que o servidor vai usar (você pode definir a porta via variáveis de ambiente)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta o app para ser usado no Firebase Functions ou outro servidor, caso necessário
export default app;
