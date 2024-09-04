document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coleta os dados do formulário
    const cidade = document.getElementById('cidade').value;
    const concessionaria = document.getElementById('concessionaria').value;
    const empresa = document.getElementById('empresa').value;
    const tipoProjeto = document.querySelector('input[name="tipo_projeto"]:checked').value;

    // Armazenar os dados no localStorage (ou poderia ser no backend)
    localStorage.setItem('projetoCidade', cidade);
    localStorage.setItem('projetoConcessionaria', concessionaria);
    localStorage.setItem('projetoEmpresa', empresa);
    localStorage.setItem('projetoTipo', tipoProjeto);

    // Redirecionar para a página de características do poste
    window.location.href = 'index.html';
});