document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    console.log('Dados enviados para o servidor:', { email, password }); // Verifique se os dados estão corretos

    fetch('http://localhost:7777/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha: password })
    })
    .then(response => {
        console.log('Resposta do servidor:', response); // Verifique a resposta
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data); // Verifique os dados recebidos
        if (data.success) {
            alert('Registro bem-sucedido!');
            document.querySelector('.register-container').classList.add('hidden');
            document.querySelector('.login-container').classList.remove('hidden');
        } else {
            alert('Registro falhou: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro no registro:', error);
        alert('Erro ao registrar: ' + error.message);
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
