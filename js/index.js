


document.addEventListener('DOMContentLoaded', function () {

    var btn = document.getElementById('calculate');
    var resultadoDiv = document.getElementById('resultado');
    var vectorChart;

    if (!btn || !resultadoDiv) {
        console.error("Elementos necessários não foram encontrados.");
        return;
    }

    btn.addEventListener('click', function () {

        // FORÇA 1
        let vao1 = Number(document.getElementById('span1_F1').value);
        let ang1 = Number(document.getElementById('angle1_F1').value);
        let redeMt1Select = document.getElementById('rede_mt_F1');
        let redeBt1Select = document.getElementById('rede_bt_F1');
        let nivelMt1 =Number (document.getElementById('nivel_cruzeta_mt_F1').value);
        let estaio1Select =Number (document.getElementById('estaio_1').value);
        let fibra1Select = document.getElementById('usoMutuo_1');



        let redeMt1Value = parseFloat(redeMt1Select.value); // Valor de MT1
        let redeMt1Id = redeMt1Select.options[redeMt1Select.selectedIndex]?.id || 'ID não encontrado'; // ID de MT1
        let redeBt1Value = parseFloat(redeBt1Select.value); // Valor de BT1
        let redeBt1Id = redeBt1Select.options[redeBt1Select.selectedIndex]?.id || 'ID não encontrado'; // ID de BT1

        let somaF1 = (redeMt1Value * nivelMt1) + redeBt1Value + estaio1Select + fibra1Select;
        let rad1 = ang1 * Math.PI / 180;
        let x1 = somaF1 * Math.cos(rad1);
        let y1 = somaF1 * Math.sin(rad1);

 

        let xResult = x1;
        let yResult = y1;
        let magnitudeResultante = Math.sqrt(xResult * xResult + yResult * yResult);
        let anguloResultante = Math.atan2(yResult, xResult) * 180 / Math.PI;

        // Atualiza o conteúdo do resultadoDiv com a tabela
        resultadoDiv.innerHTML = `
            <h2>Cálculo de Esforço Mecânico</h2>
            <table>
                <thead>
                    <tr>
                        <th>Dados</th>
                        <th>Informações</th>
                        <th>Força</th>
                        <th>Vão (m)</th>
                        <th>Ângulo (Ɵ)</th>
                        <th>Cabo MT Tipo</th>
                        <th>Cabo MT (daN)</th>
                        <th>Cabo BT Tipo</th>
                        <th>Cabo BT (daN)</th>
                        <th>Estaio</th>
                        <th>Cabo Optico</th>
                        <th>Cabo Metalico</th>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="f1">
                        <td>Cidade:</td>
                        <td></td>
                        <td>F1</td>
                        <td>${vao1}</td>
                        <td>${ang1.toFixed(2)}</td>
                        <td>${redeMt1Id}</td>
                        <td>${redeMt1Value}</td>
                        <td>${redeBt1Id}</td>
                        <td>${redeBt1Value}</td>
                        <td>${estaio1Select}</td>
                        <td></td>
                        <td></td>
                        <td>${x1.toFixed(2)}</td>
                        <td>${y1.toFixed(2)}</td>
                    </tr>
                   
                    <tr class="soma">
                        <td>Vetor</td>
                        <td colspan="3">${magnitudeResultante.toFixed(2)}</td>
                        <td>Ângulo</td>
                        <td colspan="2">${anguloResultante.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    });
});


    // Função para lidar com o logout
    function logout() {
        // Remove o token JWT do localStorage
        localStorage.removeItem('token');
        
        // Redireciona o usuário para a página de login
        window.location.href = 'login.html'; // Substitua 'login.html' pela URL da sua página de login
    }

    // Adiciona o evento de clique ao botão de logout
    document.getElementById('logout').addEventListener('click', logout);

