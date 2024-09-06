// Função de login usando MySQL no backend
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Envia uma requisição ao servidor Node.js para autenticar o usuário
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Armazena o token JWT no localStorage para futuras requisições
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!');
            window.location.href = 'index2_Bnv.html';  // Altere para a página de destino
        } else {
            alert('Login falhou: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro no login:', error.message);
        alert('Erro ao fazer login: ' + error.message);
    });
});

// Função de registro usando MySQL no backend
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const registerEmail = document.getElementById('registerUsername').value;
    const registerPassword = document.getElementById('registerPassword').value;

    // Envia uma requisição ao servidor Node.js para registrar o usuário
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: registerEmail, senha: registerPassword })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            window.location.href = 'index2_Bnv.html';  // Altere para a página de destino
        }
    })
    .catch(error => {
        console.error('Erro ao criar conta:', error.message);
        alert('Erro ao criar conta: ' + error.message);
    });
});
