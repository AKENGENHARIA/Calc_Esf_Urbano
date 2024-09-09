document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha: password })
    })
    
    .then(response => response.json())
    .then(data => {
        console.log('Dados recebidos:', data);
        if (data.token) {
            localStorage.setItem('token', data.token);  // Armazena o token JWT no localStorage
            alert('Login bem-sucedido!');
            window.location.href = 'index2_Bnv.html';  // Redireciona para a próxima página
        } else {
            alert('Login falhou: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login: ' + error.message);
    });
});


document.getElementById('showRegisterForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.login-container').classList.add('hidden');
    document.querySelector('.register-container').classList.remove('hidden');
});

document.getElementById('showLoginForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.register-container').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
});
