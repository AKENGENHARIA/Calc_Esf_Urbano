// Função para configurar visibilidade dos campos para uma seção estaio
function setupEstaio(section) {
    const estaioSim = document.getElementById(`estaio_sim${section}`);
    const estaioNao = document.getElementById(`estaio_nao${section}`);
    const estaioF = document.getElementById(`estaio_F${section}`);
    const estaioNumber = document.getElementById(`estaio_number${section}`);

    if (!estaioSim || !estaioNao || !estaioF || !estaioNumber) {
        console.error(`Elementos para Estaio ${section} não encontrados.`);
        return;
    }

    estaioF.style.display = 'none'; // Inicialmente oculto
    estaioNumber.style.display = 'none'; // Inicialmente oculto

    estaioSim.addEventListener('change', () => {
        if (estaioSim.checked) {
            estaioF.style.display = 'block';
            estaioNumber.style.display = 'block';
        }
    });

    estaioNao.addEventListener('change', () => {
        if (estaioNao.checked) {
            estaioF.style.display = 'none';
            estaioNumber.style.display = 'none';
        }
    });
}

// Inicialize todas as seções de estaio
for (let i = 1; i <= 5; i++) {
    setupEstaio(i);
}


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
   let ang1 = Number(document.getElementById('angle1_F1').value);
   let redeMt1Select = document.getElementById('rede_mt_F1');
   let redeBt1Select = document.getElementById('rede_bt_F1');
   let nivelMt1 = Number(document.getElementById('nivel_cruzeta_mt_F1').value);
   let vao1 = Number(document.getElementById('span1_F1').value);

   let redeMt1Value = parseFloat(redeMt1Select.value); // Valor de MT1
   let redeMt1Id = redeMt1Select.options[redeMt1Select.selectedIndex]?.id || 'ID não encontrado'; // ID de MT1
   let redeBt1Value = parseFloat(redeBt1Select.value); // Valor de BT1
   let redeBt1Id = redeBt1Select.options[redeBt1Select.selectedIndex]?.id || 'ID não encontrado'; // ID de BT1

   let somaF1 = (redeMt1Value * nivelMt1) + redeBt1Value;
   let rad1 = ang1 * Math.PI / 180;
   let x1 = somaF1 * Math.cos(rad1);
   let y1 = somaF1 * Math.sin(rad1);

   // FORÇA 2
   let ang2 = Number(document.getElementById('angle2_F2').value);
   let redeMt2Select = document.getElementById('rede_mt_F2');
   let redeBt2Select = document.getElementById('rede_bt_F2');
   let nivelMt2 = Number(document.getElementById('nivel_cruzeta_mt_F2').value);
   let vao2 = Number(document.getElementById('span2_F2').value);

   let redeMt2Value = parseFloat(redeMt2Select.value); // Valor de MT2
   let redeMt2Id = redeMt2Select.options[redeMt2Select.selectedIndex]?.id || 'ID não encontrado'; // ID de MT2
   let redeBt2Value = parseFloat(redeBt2Select.value); // Valor de BT2
   let redeBt2Id = redeBt2Select.options[redeBt2Select.selectedIndex]?.id || 'ID não encontrado'; // ID de BT2

   let somaF2 = (redeMt2Value * nivelMt2) + redeBt2Value;
   let rad2 = ang2 * Math.PI / 180;
   let x2 = somaF2 * Math.cos(rad2);
   let y2 = somaF2 * Math.sin(rad2);

   // FORÇA 3
   let ang3 = Number(document.getElementById('angle3_F3').value);
   let redeMt3Select = document.getElementById('rede_mt_F3');
   let redeBt3Select = document.getElementById('rede_bt_F3');
   let nivelMt3 = Number(document.getElementById('nivel_cruzeta_mt_F3').value);
   let vao3 = Number(document.getElementById('span3_F3').value);

   let redeMt3Value = parseFloat(redeMt3Select.value); // Valor de MT3
   let redeMt3Id = redeMt3Select.options[redeMt3Select.selectedIndex]?.id || 'ID não encontrado'; // ID de MT3
   let redeBt3Value = parseFloat(redeBt3Select.value); // Valor de BT3
   let redeBt3Id = redeBt3Select.options[redeBt3Select.selectedIndex]?.id || 'ID não encontrado'; // ID de BT3

   let somaF3 = (redeMt3Value * nivelMt3) + redeBt3Value;
   let rad3 = ang3 * Math.PI / 180;
   let x3 = somaF3 * Math.cos(rad3);
   let y3 = somaF3 * Math.sin(rad3);

   // FORÇA 4
   let ang4 = Number(document.getElementById('angle4_F4').value);
   let redeMt4Select = document.getElementById('rede_mt_F4');
   let redeBt4Select = document.getElementById('rede_bt_F4');
   let nivelMt4 = Number(document.getElementById('nivel_cruzeta_mt_F4').value);
   let vao4 = Number(document.getElementById('span4_F4').value);

   let redeMt4Value = parseFloat(redeMt4Select.value); // Valor de MT4
   let redeMt4Id = redeMt4Select.options[redeMt4Select.selectedIndex]?.id || 'ID não encontrado'; // ID de MT4
   let redeBt4Value = parseFloat(redeBt4Select.value); // Valor de BT4
   let redeBt4Id = redeBt4Select.options[redeBt4Select.selectedIndex]?.id || 'ID não encontrado'; // ID de BT4

   let somaF4 = (redeMt4Value * nivelMt4) + redeBt4Value;
   let rad4 = ang4 * Math.PI / 180;
   let x4 = somaF4 * Math.cos(rad4);
   let y4 = somaF4 * Math.sin(rad4);

   // FORÇA 5
   let ang5 = Number(document.getElementById('angle5_F5').value);
   let redeMt5Select = document.getElementById('rede_mt_F5');
   let redeBt5Select = document.getElementById('rede_bt_F5');
   let nivelMt5 = Number(document.getElementById('nivel_cruzeta_mt_F5').value);
   let vao5 = Number(document.getElementById('span5_F5').value);

   let redeMt5Value = parseFloat(redeMt5Select.value); // Valor de MT5
   let redeMt5Id = redeMt5Select.options[redeMt5Select.selectedIndex]?.id || 'ID não encontrado'; // ID de MT5
   let redeBt5Value = parseFloat(redeBt5Select.value); // Valor de BT5
   let redeBt5Id = redeBt5Select.options[redeBt5Select.selectedIndex]?.id || 'ID não encontrado'; // ID de BT5

   let somaF5 = (redeMt5Value * nivelMt5) + redeBt5Value;
   let rad5 = ang5 * Math.PI / 180;
   let x5 = somaF5 * Math.cos(rad5);
   let y5 = somaF5 * Math.sin(rad5);

   let xResult = x1 + x2 + x3 + x4 + x5;
   let yResult = y1 + y2 + y3 + y4 + y5;
   let magnitudeResultante = Math.sqrt(xResult * xResult + yResult * yResult);
   let anguloResultante = Math.atan2(yResult, xResult) * 180 / Math.PI;

        // Atualiza o conteúdo do resultadoDiv com a tabela
        resultadoDiv.innerHTML = `
            <h2>Cálculo de Esforço Mecânico</h2>
            <table>
                <thead>
                    <tr>
                        <th>Força</th>
                        <th>Ângulo (Ɵ)</th>
                        <th>Rede MT Tipo (ID)</th>
                        <th>Rede BT Tipo</th>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="f1">F1</td>
                        <td class="f1">${ang1.toFixed(2)}</td>
                        <td class="f1">${redeMt1Id}</td>
                        <td class="f1">${redeBt1Id}</td>
                        <td class="f1">${x1.toFixed(2)}</td>
                        <td class="f1">${y1.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td class="f2">F2</td>
                        <td class="f2">${ang2.toFixed(2)}</td>
                        <td class="f2">${redeMt2Id}</td>
                        <td class="f2">${redeBt2Id}</td>
                        <td class="f2">${x2.toFixed(2)}</td>
                        <td class="f2">${y2.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td class="f3">F3</td>
                        <td class="f3">${ang3.toFixed(2)}</td>
                        <td class="f3">${redeMt3Id}</td>
                        <td class="f3">${redeBt3Id}</td>
                        <td class="f3">${x3.toFixed(2)}</td>
                        <td class="f3">${y3.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td class="f4">F4</td>
                        <td class="f4">${ang4.toFixed(2)}</td>
                        <td class="f4">${redeMt4Id}</td>
                        <td class="f4">${redeBt4Id}</td>
                        <td class="f4">${x4.toFixed(2)}</td>
                        <td class="f4">${y4.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td class="f5">F5</td>
                        <td class="f5">${ang5.toFixed(2)}</td>
                        <td class="f5">${redeMt5Id}</td>
                        <td class="f5">${redeBt5Id}</td>
                        <td class="f5">${x5.toFixed(2)}</td>
                        <td class="f5">${y5.toFixed(2)}</td>
                    </tr>
                         <tr class="soma">
                <td colspan="1">Vetor</td>
                <td colspan="3">${magnitudeResultante.toFixed(2)}</td>
                <td>Ângulo</td>
                <td colspan="2">${anguloResultante.toFixed(2)}</td>
            </tr>
                </tbody>
            </table>
        `;
    });
});
// Função para deslogar o usuário ao clicar no botão "Log out"
document.getElementById('generatePdf').addEventListener('click', function() {
    auth.signOut().then(() => {
        console.log('Usuário deslogado com sucesso.');
        alert('Você foi deslogado.');
        // Redirecionar para a página de login
        window.location.href = 'login.html';  // Certifique-se de que a página de login.html exista
    }).catch((error) => {
        console.error('Erro ao deslogar:', error.message);
        alert('Erro ao deslogar: ' + error.message);
    });
});
