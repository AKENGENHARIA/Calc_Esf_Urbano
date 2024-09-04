document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de autenticação simples
    if (username === 'admin' && password === 'admin123') {
        console.log('Redirecionamento iniciado');
        window.location.href = 'bemvindo.html';
    } else {
        alert('Usuário ou senha incorretos');
    }
});