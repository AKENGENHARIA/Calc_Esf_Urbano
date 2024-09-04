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
    var modal = document.getElementById('resultModal');
    var resultadoModal = document.getElementById('resultadoModal');
    var vectorChart;

    if (!btn || !modal || !resultadoModal) {
        console.error("Elementos necessários não foram encontrados.");
        return;
    }

    btn.addEventListener('click', function () {
        // Força 1
        let ang1 = 0, redeMt1 = 415, redeBt1 = 10, nivelMt1 = 0, vao1 = 0;
        let somaF1 = (redeMt1 * nivelMt1) + redeBt1;
        let rad1 = ang1 * Math.PI / 180;
        let x1 = somaF1 * Math.cos(rad1);
        let y1 = somaF1 * Math.sin(rad1);

        // Força 2
        let ang2 = 45, redeMt2 = 255, redeBt2 = 0, nivelMt2 = 0, vao2 = 0;
        let somaF2 = (redeMt2 * nivelMt2) + redeBt2;
        let rad2 = ang2 * Math.PI / 180;
        let x2 = somaF2 * Math.cos(rad2);
        let y2 = somaF2 * Math.sin(rad2);

        // Força 3
        let ang3 = 90, redeMt3 = 517, redeBt3 = 0, nivelMt3 = 0, vao3 = 31;
        let somaF3 = (redeMt3 * nivelMt3) + redeBt3;
        let rad3 = ang3 * Math.PI / 180;
        let x3 = somaF3 * Math.cos(rad3);
        let y3 = somaF3 * Math.sin(rad3);

        // Força 4
        let ang4 = 135, redeMt4 = 58, redeBt4 = 0, nivelMt4 = 0, vao4 = 32;
        let somaF4 = (redeMt4 * nivelMt4) + redeBt4;
        let rad4 = ang4 * Math.PI / 180;
        let x4 = somaF4 * Math.cos(rad4);
        let y4 = somaF4 * Math.sin(rad4);

        // Força 5
        let ang5 = 180, redeMt5 = 174, redeBt5 = 0, nivelMt5 = 0, vao5 = 33;
        let somaF5 = (redeMt5 * nivelMt5) + redeBt5;
        let rad5 = ang5 * Math.PI / 180;
        let x5 = somaF5 * Math.cos(rad5);
        let y5 = somaF5 * Math.sin(rad5);

        // Resultado Final
        let xResult = x1 + x2 + x3 + x4 + x5;
        let yResult = y1 + y2 + y3 + y4 + y5;
        let magnitudeResultante = Math.sqrt(xResult * xResult + yResult * yResult);
        let anguloResultante = Math.atan2(yResult, xResult) * 180 / Math.PI;

        // Atualiza o conteúdo do modal
        resultadoModal.innerHTML = `
            <h3>Resultados das Forças</h3>

            <div class="force-box">
                <h4>Força 1</h4>
                <p><strong>Ângulo:</strong> ${ang1}°</p>
                <p><strong>Vão:</strong> ${vao1}</p>
                <p><strong>Rede MT:</strong> ${redeMt1}</p>
                <p><strong>Rede BT:</strong> ${redeBt1}</p>
                <p><strong>Magnitude:</strong> ${somaF1.toFixed(2)}</p>
                <p><strong>Componente X:</strong> ${x1.toFixed(2)}</p>
                <p><strong>Componente Y:</strong> ${y1.toFixed(2)}</p>
            </div>

            <div class="force-box">
                <h4>Força 2</h4>
                <p><strong>Ângulo:</strong> ${ang2}°</p>
                <p><strong>Vão:</strong> ${vao2}</p>
                <p><strong>Rede MT:</strong> ${redeMt2}</p>
                <p><strong>Rede BT:</strong> ${redeBt2}</p>
                <p><strong>Magnitude:</strong> ${somaF2.toFixed(2)}</p>
                <p><strong>Componente X:</strong> ${x2.toFixed(2)}</p>
                <p><strong>Componente Y:</strong> ${y2.toFixed(2)}</p>
            </div>

            <div class="force-box">
                <h4>Força 3</h4>
                <p><strong>Ângulo:</strong> ${ang3}°</p>
                <p><strong>Vão:</strong> ${vao3}</p>
                <p><strong>Rede MT:</strong> ${redeMt3}</p>
                <p><strong>Rede BT:</strong> ${redeBt3}</p>
                <p><strong>Magnitude:</strong> ${somaF3.toFixed(2)}</p>
                <p><strong>Componente X:</strong> ${x3.toFixed(2)}</p>
                <p><strong>Componente Y:</strong> ${y3.toFixed(2)}</p>
            </div>

            <div class="force-box">
                <h4>Força 4</h4>
                <p><strong>Ângulo:</strong> ${ang4}°</p>
                <p><strong>Vão:</strong> ${vao4}</p>
                <p><strong>Rede MT:</strong> ${redeMt4}</p>
                <p><strong>Rede BT:</strong> ${redeBt4}</p>
                <p><strong>Magnitude:</strong> ${somaF4.toFixed(2)}</p>
                <p><strong>Componente X:</strong> ${x4.toFixed(2)}</p>
                <p><strong>Componente Y:</strong> ${y4.toFixed(2)}</p>
            </div>

            <div class="force-box">
                <h4>Força 5</h4>
                <p><strong>Ângulo:</strong> ${ang5}°</p>
                <p><strong>Vão:</strong> ${vao5}</p>
                <p><strong>Rede MT:</strong> ${redeMt5}</p>
                <p><strong>Rede BT:</strong> ${redeBt5}</p>
                <p><strong>Magnitude:</strong> ${somaF5.toFixed(2)}</p>
                <p><strong>Componente X:</strong> ${x5.toFixed(2)}</p>
                <p><strong>Componente Y:</strong> ${y5.toFixed(2)}</p>
            </div>

            <h3>Resultado Final</h3>
            <p><strong>Magnitude Resultante:</strong> ${magnitudeResultante.toFixed(2)}</p>
            <p><strong>Ângulo Resultante:</strong> ${anguloResultante.toFixed(2)}°</p>
        `;

        // Mostra o modal
        modal.style.display = "block";

        // Desenha o gráfico de vetores usando Chart.js
        const ctx = document.getElementById('vectorChart').getContext('2d');
        if (vectorChart) {
            vectorChart.destroy(); // Destroi o gráfico anterior, se existir
        }
        vectorChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Força 1',
                    data: [{x: 0, y: 0}, {x: x1, y: y1}],
                    borderColor: 'blue',
                    showLine: true,
                    fill: false
                },
                {
                    label: 'Força 2',
                    data: [{x: 0, y: 0}, {x: x2, y: y2}],
                    borderColor: 'green',
                    showLine: true,
                    fill: false
                },
                {
                    label: 'Força 3',
                    data: [{x: 0, y: 0}, {x: x3, y: y3}],
                    borderColor: 'red',
                    showLine: true,
                    fill: false
                },
                {
                    label: 'Força 4',
                    data: [{x: 0, y: 0}, {x: x4, y: y4}],
                    borderColor: 'purple',
                    showLine: true,
                    fill: false
                },
                {
                    label: 'Força 5',
                    data: [{x: 0, y: 0}, {x: x5, y: y5}],
                    borderColor: 'orange',
                    showLine: true,
                    fill: false
                },
                {
                    label: 'Resultado',
                    data: [{x: 0, y: 0}, {x: xResult, y: yResult}],
                    borderColor: 'black',
                    showLine: true,
                    fill: false,
                    borderDash: [5, 5]
                }]
            },
            options: {
                scales: {
                    x: {beginAtZero: true},
                    y: {beginAtZero: true}
                }
            }
        });
    });

    // Fecha o modal quando o usuário clicar fora do conteúdo do modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});




        const { PDFDocument, rgb } = PDFLib;

        function drawTableRow(page, y, data, isHeader = false) {
            const rowHeight = 25;
            const columnWidth1 = 100;
            const columnWidth2 = 100;
            const columnWidth3 = 100;
            const columnWidth4 = 100;
            const textColor = rgb(0.2, 0.2, 0.2);
            const headerColor = rgb(0.9, 0.9, 0.9);

            // Garantir que o valor da magnitude seja um número
            const magnitude = isNaN(data.magnitude) ? 0 : data.magnitude;

            // Garantir que o valor do ângulo resultante seja um número
            const anguloResultante = isNaN(data.anguloResultante) ? 'N/A' : data.anguloResultante.toFixed(2);

            // Desenha retângulo para cada célula (com cor de fundo para o cabeçalho)
            page.drawRectangle({
                x: 50,
                y: y,
                width: columnWidth1,
                height: rowHeight,
                color: isHeader ? headerColor : undefined,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1
            });
            page.drawText(data.forca, { x: 55, y: y + 8, size: 12, color: textColor });

            page.drawRectangle({
                x: 50 + columnWidth1,
                y: y,
                width: columnWidth2,
                height: rowHeight,
                color: isHeader ? headerColor : undefined,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1
            });
            page.drawText(`${data.angulo}°`, { x: 55 + columnWidth1, y: y + 8, size: 12, color: textColor });

            page.drawRectangle({
                x: 50 + columnWidth1 + columnWidth2,
                y: y,
                width: columnWidth3,
                height: rowHeight,
                color: isHeader ? headerColor : undefined,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1
            });
            page.drawText(`${magnitude.toFixed(2)}`, { x: 55 + columnWidth1 + columnWidth2, y: y + 8, size: 12, color: textColor });

            page.drawRectangle({
                x: 50 + columnWidth1 + columnWidth2 + columnWidth3,
                y: y,
                width: columnWidth4,
                height: rowHeight,
                color: isHeader ? headerColor : undefined,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1
            });
            page.drawText(`${anguloResultante}°`, {
                x: 55 + columnWidth1 + columnWidth2 + columnWidth3,
                y: y + 8,
                size: 12,
                color: textColor
            });
        }

        document.getElementById('generatePdf').addEventListener('click', async function () {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([600, 500]);

            // Definir título e subtítulo
            page.drawText('Calculadora de Esforço Urbano', { x: 50, y: 480, size: 24, color: rgb(0.2, 0.2, 0.2) });
            page.drawText('Forças e Resultados', { x: 50, y: 450, size: 18, color: rgb(0.2, 0.2, 0.2) });

            // Posição inicial da tabela
            const tableStartY = 430;
            const rowHeight = 25;

            // Cabeçalho da tabela
            drawTableRow(page, tableStartY, { forca: 'Força', angulo: 'Ângulo', magnitude: 'Magnitude', anguloResultante: 'Ângulo Resultante' }, true);

            let currentY = tableStartY - rowHeight;
            const forces = window.pdfData?.forcas || [];

            // Linhas da tabela com dados
            forces.forEach(force => {
                drawTableRow(page, currentY, {
                    forca: `Força ${force.numero}`,
                    angulo: force.angulo,
                    magnitude: force.magnitude,
                    anguloResultante: force.anguloResultante
                });
                currentY -= rowHeight;
            });

            // Resultado Final
            page.drawText('Resultado Final', { x: 50, y: currentY - 20, size: 18, color: rgb(0.2, 0.2, 0.2) });
            page.drawText(`Magnitude Resultante: ${window.pdfData?.magnitudeResultante?.toFixed(2) || '0.00'}`, { x: 50, y: currentY - 50, size: 14, color: rgb(0, 0, 0) });
            page.drawText(`Ângulo Resultante: ${window.pdfData?.anguloResultante?.toFixed(2) || '0.00'}°`, { x: 50, y: currentY - 70, size: 14, color: rgb(0, 0, 0) });

            // Salva o PDF e permite o download
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'resultado.pdf';
            link.click();
        });