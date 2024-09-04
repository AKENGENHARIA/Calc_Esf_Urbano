document.addEventListener('DOMContentLoaded', function() {
    var calculateButton = document.getElementById('calculate');
    var generatePdfButton = document.getElementById('generatePdf');

    calculateButton.addEventListener('click', function() {
        // Obter e converter valores das entradas
        var ang1 = parseFloat(document.getElementById('angle1_F1').value) || 0;
        var redeMt1 = parseFloat(document.getElementById('rede_mt_F1').value) || 0;
        var redeBt1 = parseFloat(document.getElementById('rede_bt_F1').value) || 0;
        var nivelMt1 = parseFloat(document.getElementById('nivel_cruzeta_mt_F1').value) || 0;

        var ang2 = parseFloat(document.getElementById('angle2_F2').value) || 0;
        var redeMt2 = parseFloat(document.getElementById('rede_mt_F2').value) || 0;
        var redeBt2 = parseFloat(document.getElementById('rede_bt_F2').value) || 0;
        var nivelMt2 = parseFloat(document.getElementById('nivel_cruzeta_mt_F2').value) || 0;

        // Calculando a força resultante para F1
        var somaF1 = (redeMt1 * nivelMt1) + redeBt1;

        // Calculando componentes dos vetores para F1
        const rad1 = ang1 * Math.PI / 180;
        const x1 = somaF1 * Math.cos(rad1);
        const y1 = somaF1 * Math.sin(rad1);

        // Calculando a força resultante para F2
        var somaF2 = (redeMt2 * nivelMt2) + redeBt2;

        // Calculando componentes dos vetores para F2
        const rad2 = ang2 * Math.PI / 180;
        const x2 = somaF2 * Math.cos(rad2);
        const y2 = somaF2 * Math.sin(rad2);

        // Calculando vetor resultante
        const xResultante = x1 + x2;
        const yResultante = y1 + y2;

        // Calculando magnitude e ângulo do vetor resultante
        const magnitude = Math.sqrt(xResultante * xResultante + yResultante * yResultante);
        const anguloResultante = Math.atan2(yResultante, xResultante) * 180 / Math.PI;

        // Exibindo resultados
        var resultadoDiv = document.getElementById('resultado');
        if (resultadoDiv) {
            resultadoDiv.innerHTML = `
                <h3>Resultado do Cálculo</h3>
                <p><strong>Força 1:</strong></p>
                <p>Ângulo: ${ang1}°</p>
                <p>Rede MT: ${redeMt1}</p>
                <p>Rede BT: ${redeBt1}</p>
                <p><strong>Força 2:</strong></p>
                <p>Ângulo: ${ang2}°</p>
                <p>Rede MT: ${redeMt2}</p>
                <p>Rede BT: ${redeBt2}</p>
                <p><strong>Vetor Resultante:</strong></p>
                <p>Magnitude: ${magnitude.toFixed(2)}</p>
                <p>Ângulo: ${anguloResultante.toFixed(2)}°</p>
            `;
        } else {
            console.error('Elemento com ID "resultado" não encontrado.');
        }

        // Atualizar dados para geração de PDF
        window.pdfData = {
            ang1,
            redeMt1,
            redeBt1,
            nivelMt1,
            ang2,
            redeMt2,
            redeBt2,
            nivelMt2,
            magnitude,
            anguloResultante
        };
    });

    generatePdfButton.addEventListener('click', async function() {
        // Importa pdf-lib
        const { PDFDocument, rgb } = PDFLib;

        // Cria um novo documento PDF
        const doc = await PDFDocument.create();
        const page = doc.addPage([600, 500]);

        // Adiciona conteúdo ao PDF
        page.drawText('Calculadora de Esforço Urbano', { x: 50, y: 480, size: 24, color: rgb(0, 0, 0) });

        // Adiciona tabela com informações das forças
        page.drawText('Forças e Resultados', { x: 50, y: 450, size: 18, color: rgb(0, 0, 0) });

        // Cria uma tabela
        const tableStartY = 430;
        const rowHeight = 20;
        const columnWidth1 = 120;
        const columnWidth2 = 120;
        const columnWidth3 = 120;
        const columnWidth4 = 120;

        page.drawRectangle({
            x: 50,
            y: tableStartY,
            width: columnWidth1 + columnWidth2 + columnWidth3 + columnWidth4,
            height: rowHeight * 4,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });

        page.drawRectangle({
            x: 50,
            y: tableStartY,
            width: columnWidth1,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText('Força', { x: 55, y: tableStartY + 5, size: 12 });

        page.drawRectangle({
            x: 50 + columnWidth1,
            y: tableStartY,
            width: columnWidth2,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText('Ângulo', { x: 50 + columnWidth1 + 5, y: tableStartY + 5, size: 12 });

        page.drawRectangle({
            x: 50 + columnWidth1 + columnWidth2,
            y: tableStartY,
            width: columnWidth3,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText('Magnitude', { x: 50 + columnWidth1 + columnWidth2 + 5, y: tableStartY + 5, size: 12 });

        page.drawRectangle({
            x: 50 + columnWidth1 + columnWidth2 + columnWidth3,
            y: tableStartY,
            width: columnWidth4,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText('Ângulo Resultante', { x: 50 + columnWidth1 + columnWidth2 + columnWidth3 + 5, y: tableStartY + 5, size: 12 });

        // Adiciona linha para Força 1
        const force1Y = tableStartY - rowHeight;
        page.drawRectangle({
            x: 50,
            y: force1Y,
            width: columnWidth1,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText('Força 1', { x: 55, y: force1Y + 5, size: 12 });

        page.drawRectangle({
            x: 50 + columnWidth1,
            y: force1Y,
            width: columnWidth2,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText(`${window.pdfData.ang1}°`, { x: 50 + columnWidth1 + 5, y: force1Y + 5, size: 12 });

        const magnitudeF1 = (parseFloat(window.pdfData.redeMt1) * parseFloat(window.pdfData.nivelMt1) + parseFloat(window.pdfData.redeBt1)) || 0;

        page.drawRectangle({
            x: 50 + columnWidth1 + columnWidth2,
            y: force1Y,
            width: columnWidth3,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText(`${magnitudeF1.toFixed(2)}`, { x: 50 + columnWidth1 + columnWidth2 + 5, y: force1Y + 5, size: 12 });

        page.drawRectangle({
            x: 50 + columnWidth1 + columnWidth2 + columnWidth3,
            y: force1Y,
            width: columnWidth4,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1
        });
        page.drawText(`${window.pdfData.anguloResultante.toFixed(2)}°`, { x: 50 + columnWidth1 + columnWidth2 + columnWidth3 + 5, y: force1Y + 5, size: 12 });

        // Adicione linhas para Força 2 e outros, seguindo o mesmo padrão

        // Salva o PDF
        const pdfBytes = await doc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resultado.pdf';
        link.click();
    });
});
