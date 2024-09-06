// Lida com a submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    console.log('Tentando fazer login...');
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Envia uma requisição ao servidor Node.js para autenticar o usuário
    fetch('http://localhost:7777/login', {  // Certifique-se de que o caminho está correto
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha: password })
    })
    .then(response => response.json())  // Tenta converter a resposta para JSON
    .then(data => {
        if (data.token) {
            // Armazena o token no localStorage ou sessionStorage
            localStorage.setItem('authToken', data.token);

            // Redireciona para a página index2_Bnv
            window.location.href = 'index2_Bnv.html';
        } else {
            alert('Login falhou: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login: ' + error.message);
    });
});

// Alterna para o formulário de registro
document.getElementById('showRegisterForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.login-container').classList.add('hidden');
    document.querySelector('.register-container').classList.remove('hidden');
});

// Alterna para o formulário de login
document.getElementById('showLoginForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.register-container').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
});
