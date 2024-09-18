document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projetoId = urlParams.get('projetoId');

    // Configuração inicial do modal ao carregar a página
    document.getElementById('modalPoste').style.display = 'flex';

    // Evento de submissão do formulário do modal
    document.getElementById('formPoste').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário

        if (validarFormulario()) {
            // Coleta as informações do formulário do modal
            const numeroPoste = document.getElementById('numeroPoste').value;
            const tipoPoste = document.querySelector('input[name="tipoPoste"]:checked').value;
            const alturaPoste = document.querySelector('input[name="alturaPoste"]:checked').value;
            const capacidadePoste = document.querySelector('input[name="capacidadePoste"]:checked').value;

            // Cria um objeto com os dados do poste
            const dadosPoste = {
                projetoId: projetoId,
                numeroPoste: numeroPoste,
                tipoPoste: tipoPoste,
                alturaPoste: alturaPoste,
                capacidadePoste: capacidadePoste
            };

            // Salva os dados no localStorage
            salvarDadosLocalStorage(dadosPoste);

            // Fecha o modal
            document.getElementById('modalPoste').style.display = 'none';
            alert('Dados do poste salvos com sucesso!');

            // Mostra os campos para inserção das forças
            document.getElementById('forces-container').style.display = 'block';
            generateForceInputs(); // Gera os inputs para as forças após o modal ser fechado
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
});

// Função para validar o formulário
function validarFormulario() {
    const numeroPoste = document.getElementById('numeroPoste').value;
    const tipoPoste = document.querySelector('input[name="tipoPoste"]:checked');
    const alturaPoste = document.querySelector('input[name="alturaPoste"]:checked');
    const capacidadePoste = document.querySelector('input[name="capacidadePoste"]:checked');

    return numeroPoste && tipoPoste && alturaPoste && capacidadePoste;
}

// Função para salvar dados no localStorage
function salvarDadosLocalStorage(dadosPoste) {
    let postes = JSON.parse(localStorage.getItem('postes')) || [];
    postes.push(dadosPoste);
    localStorage.setItem('postes', JSON.stringify(postes));
}

// Função para gerar os campos das forças
function generateForceInputs() {
    const forceData = [
        { id: 'F1', estaioId: 1 },
        { id: 'F2', estaioId: 2 },
        { id: 'F3', estaioId: 3 },
        { id: 'F4', estaioId: 4 },
        { id: 'F5', estaioId: 5 }
    ];

    const forcesContainer = document.getElementById('forces-container');
    forcesContainer.innerHTML = '';

    forceData.forEach(force => {
        const forceHTML = `<div class="force-input" id="${force.id}"> 
          <h3>FORÇA ${force.estaioId}</h3>
                <section class="vao-ang">
                    <label for="span${force.estaioId}_${force.id}">Vão:</label>
                    <input type="number" id="span${force.estaioId}_${force.id}" value="">
                    <label for="angle${force.estaioId}_${force.id}">Ângulo:</label>
                    <input type="number" id="angle${force.estaioId}_${force.id}" value="">
                </section>
                <div class="RedeDentrega">
                    <h3>Rede de Energia</h3>
                    <p>Rede MT</p>
                    <select name="rede_mt_${force.id}" id="rede_mt_${force.id}">
                    <option value="0">Selecione</option>
                    <option value="415">3#50+9,5</option>
                    <option value="255">1#50+9,6</option>
                    <option value="517">3#150+9,7</option>
                    <option value="58">1#4</option>
                    <option value="116">2#4</option>
                    <option value="174">3#4</option>
                    <option value="92">1#2</option>
                    <option value="184">2#2</option>
                    <option value="276">3#2</option>
                    <option value="145">1#1/0</option>
                    <option value="290">2#1/0</option>
                    <option value="435">3#1/0</option>
                    <option value="293">1#4/0</option>
                    <option value="586">2#4/0</option>
                    <option value="879">3#4/0</option>
                    <option value="467">1#336</option>
                    <option value="934">2#336</option>
                    <option value="1401">3#336</option>
                    <option value="358">3x1x50+9</option>
                    <option value="552">3x1x120+9</option>
                    <option value="703">3x1x185+9</option>

                    </select>

                    <p>Rede BT</p>
                    <select name="rede_bt_${force.id}" id="rede_bt_${force.id}">
                    <option value="0">Selecione</option>
                    <option value="114">2x1x35+70</option>
                    <option value="181">2x1x70+70</option>
                    <option value="161">3x1x35+70</option>
                    <option value="245">3x1x70+70</option>
                    <option value="381">3x1x120+70</option>
                    <option value="58">1#4</option>
                    <option value="116">2#4(4)</option>
                    <option value="174">3#4(4)</option>
                    <option value="92">1#2</option>
                    <option value="183">2#2(4)</option>
                    <option value="184">2#2(2)</option>
                    <option value="275">3#2(4)</option>
                    <option value="276">3#2(2)</option>
                    <option value="145">1#1/0</option>
                    <option value="290">2#1/0(2)</option>
                    <option value="435">3#1/0(2)</option>
                    <option value="293">1#4/0</option>
                    <option value="586">2#4/0(1/0)</option>
                    <option value="879">3#4/0(1/0)</option>
                    <option value="467">1#336</option>
                    <option value="934">2#336(4/0)</option>
                    <option value="1401">3#336(4/0)</option>
                    </select>

                    <p>Nível da cruzeta MT</p>
                    <select name="nivel_cruzeta_mt_${force.id}" id="nivel_cruzeta_mt_${force.id}">
                        <option value="1">NIVEL 1</option>
                        <option value="0.96">NIVEL 2</option>
                        <option value="0.86">NIVEL 3</option>
                    </select>
                </div>
                <section class="estaio estaio-section">
                    <h3>Estaio ${force.estaioId}</h3>
                    <input type="radio" id="estaio_sim${force.estaioId}" name="estaio${force.estaioId}" value="sim"> Sim
                    <input type="radio" id="estaio_nao${force.estaioId}" name="estaio${force.estaioId}" value="nao"> Não
                    <select id="estaio_${force.id}">
                        <option value="0">Selecione</option>
                        <option value="CZ-CZ">CZ-CZ</option>
                        <option value="MT-PP">MT-PP</option>
                        <option value="BT-PP">BT-PP</option>
                        <option value="MT-PCP">MT-PCP</option>
                        <option value="BT-PCP">BT-PCP</option>

                    </select>
                    <input type="number" id="estaio_${force.estaioId}">
                </section>
                <section class="usoMutuo">
                    <h3>Uso Mútuo</h3>
                    <select id="usoMutuo_${force.id}">
                       <option value="0">Selecione</option>
                        <option value="81">CFO-80G 12F</option>
                        <option value="100">CFO-80G 24F</option>
                        <option value="100">CFO-80G 36F</option>
                        <option value="128">CFO-80G 48F</option>
                        <option value="128">CFO-80G 72F</option>
                        <option value="175">CFO-80G 96F</option>
                        <option value="260">CFO-80G 144F</option>

                    </select>
                </section>
        
        
        
        
        
        
        </div>`;
        forcesContainer.innerHTML += forceHTML;
    });
}
