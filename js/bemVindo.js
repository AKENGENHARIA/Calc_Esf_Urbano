// Verifica o estado de autenticação ao carregar a página
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Se não estiver autenticado, redireciona para a página de login
        window.location.href = 'login.html';
    } else {
        console.log('Usuário autenticado:', user.email);
    }
});

// Função de submit do formulário
document.getElementById('logout').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coleta os dados do formulário
    const cidade = document.getElementById('cidade').value;
    const concessionaria = document.getElementById('concessionaria').value;
    const empresa = document.getElementById('empresa').value;
    const tipoProjeto = document.querySelector('input[name="tipo_projeto"]:checked').value;

    // Armazenar os dados no localStorage
    localStorage.setItem('projetoCidade', cidade);
    localStorage.setItem('projetoConcessionaria', concessionaria);
    localStorage.setItem('projetoEmpresa', empresa);
    localStorage.setItem('projetoTipo', tipoProjeto);

    // Redirecionar para a próxima página
    window.location.href = 'index3_Corpo.html';
});
