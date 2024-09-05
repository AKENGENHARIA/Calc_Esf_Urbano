// Captura o formulário e adiciona o evento de submit
document.getElementById('projetoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Coleta os dados dos campos do formulário
    const cidade = document.getElementById('cidade').value;
    const concessionaria = document.getElementById('concessionaria').value;
    const empresa = document.getElementById('empresa').value;
    const tipoProjeto = document.querySelector('input[name="tipo_projeto"]:checked').value;

    // Armazenar os dados no localStorage
    localStorage.setItem('projetoCidade', cidade);
    localStorage.setItem('projetoConcessionaria', concessionaria);
    localStorage.setItem('projetoEmpresa', empresa);
    localStorage.setItem('projetoTipo', tipoProjeto);

    // Redirecionar para a próxima página após armazenar os dados
    window.location.href = 'index3_Corpo.html';
});
