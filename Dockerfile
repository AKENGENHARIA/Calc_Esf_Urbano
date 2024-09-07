# Usar uma versão LTS do Node.js
FROM node:14

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json (se houver)
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Definir o comando de inicialização
CMD ["npm", "start"]
