module.exports = {
  env: {
    node: true,       // Adiciona o ambiente Node.js
    es2021: true,      // Suporte para as features do ES2021
  },
  extends: "eslint:recommended",  // Extensão padrão recomendada
  parserOptions: {
    ecmaVersion: 12,   // Define a versão do ECMAScript
    sourceType: "import",  // Usa módulos ECMAScript
  },
  rules: {
    // Defina suas regras aqui
  },
};
