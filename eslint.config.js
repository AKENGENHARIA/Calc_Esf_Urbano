// eslint.config.js
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest", // Usar a versão mais recente do ECMAScript
      sourceType: "module",   // Permitir o uso de módulos ES
      globals: {
        ...globals.node,      // Definir ambiente de node.js
      },
    },
    rules: {
      "quotes": ["error", "double"], // Exemplo de regra: usar aspas duplas
      "no-unused-vars": "warn",      // Avisar sobre variáveis não utilizadas
      "indent": ["error", 2],        // Indentação com 2 espaços
      // Adicione mais regras conforme necessário
    },
  },
];
