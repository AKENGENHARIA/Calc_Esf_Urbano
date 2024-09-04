
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('calculate');
    btn.addEventListener('click', function () {
        // Força 1
        let ang1 = parseFloat(document.getElementById('angle1_F1')?.value) || 0;
        let redeMt1 = parseFloat(document.getElementById('rede_mt_F1')?.value) || 0;
        let redeBt1 = parseFloat(document.getElementById('rede_bt_F1')?.value) || 0;
        let nivelMt1 = parseFloat(document.getElementById('nivel_cruzeta_mt_F1')?.value) || 0;

        let somaF1 = (redeMt1 * nivelMt1) + redeBt1;
        let rad1 = ang1 * Math.PI / 180;
        let x1 = somaF1 * Math.cos(rad1);
        let y1 = somaF1 * Math.sin(rad1);

        // Força 2
        let ang2 = parseFloat(document.getElementById('angle2_F2')?.value) || 0;
        let redeMt2 = parseFloat(document.getElementById('rede_mt_F2')?.value) || 0;
        let redeBt2 = parseFloat(document.getElementById('rede_bt_F2')?.value) || 0;
        let nivelMt2 = parseFloat(document.getElementById('nivel_cruzeta_mt_F2')?.value) || 0;

        let somaF2 = (redeMt2 * nivelMt2) + redeBt2;
        let rad2 = ang2 * Math.PI / 180;
        let x2 = somaF2 * Math.cos(rad2);
        let y2 = somaF2 * Math.sin(rad2);

        // Força 3
        let ang3 = parseFloat(document.getElementById('angle3_F3')?.value) || 0;
        let redeMt3 = parseFloat(document.getElementById('rede_mt_F3')?.value) || 0;
        let redeBt3 = parseFloat(document.getElementById('rede_bt_F3')?.value) || 0;
        let nivelMt3 = parseFloat(document.getElementById('nivel_cruzeta_mt_F3')?.value) || 0;

        let somaF3 = (redeMt3 * nivelMt3) + redeBt3;
        let rad3 = ang3 * Math.PI / 180;
        let x3 = somaF3 * Math.cos(rad3);
        let y3 = somaF3 * Math.sin(rad3);

        // Força 4
        let ang4 = parseFloat(document.getElementById('angle4_F4')?.value) || 0;
        let redeMt4 = parseFloat(document.getElementById('rede_mt_F4')?.value) || 0;
        let redeBt4 = parseFloat(document.getElementById('rede_bt_F4')?.value) || 0;
        let nivelMt4 = parseFloat(document.getElementById('nivel_cruzeta_mt_F4')?.value) || 0;

        let somaF4 = (redeMt4 * nivelMt4) + redeBt4;
        let rad4 = ang4 * Math.PI / 180;
        let x4 = somaF4 * Math.cos(rad4);
        let y4 = somaF4 * Math.sin(rad4);

        // Força 5
        let ang5 = parseFloat(document.getElementById('angle5_F5')?.value) || 0;
        let redeMt5 = parseFloat(document.getElementById('rede_mt_F5')?.value) || 0;
        let redeBt5 = parseFloat(document.getElementById('rede_bt_F5')?.value) || 0;
        let nivelMt5 = parseFloat(document.getElementById('nivel_cruzeta_mt_F5')?.value) || 0;

        let somaF5 = (redeMt5 * nivelMt5) + redeBt5;
        let rad5 = ang5 * Math.PI / 180;
        let x5 = somaF5 * Math.cos(rad5);
        let y5 = somaF5 * Math.sin(rad5);

        // Calcula o vetor resultante
        let xResultante = x1 + x2 + x3 + x4 + x5;
        let yResultante = y1 + y2 + y3 + y4 + y5;

        const magnitudeResultante = Math.sqrt(xResultante * xResultante + yResultante * yResultante);
        const anguloResultante = Math.atan2(yResultante, xResultante) * 180 / Math.PI;

        // Armazena os dados para o PDF
        window.pdfData = {
            forcas: [
                { numero: 1, angulo: ang1, magnitude: somaF1, x: x1, y: y1 },
                { numero: 2, angulo: ang2, magnitude: somaF2, x: x2, y: y2 },
                { numero: 3, angulo: ang3, magnitude: somaF3, x: x3, y: y3 },
                { numero: 4, angulo: ang4, magnitude: somaF4, x: x4, y: y4 },
                { numero: 5, angulo: ang5, magnitude: somaF5, x: x5, y: y5 }
            ],
            magnitude: magnitudeResultante,
            anguloResultante: anguloResultante
        };

        // Atualiza a div com resultados
        document.getElementById('resultado').innerHTML = `
            <h3>Resultados das Forças</h3>
            ${window.pdfData.forcas.map(f => `
                <h4>Força ${f.numero}</h4>
                <p>Ângulo: ${f.angulo}°</p>
                <p>Magnitude: ${f.magnitude.toFixed(2)}</p>
                <p>Componente X: ${f.x.toFixed(2)}</p>
                <p>Componente Y: ${f.y.toFixed(2)}</p>
            `).join('')}
            <h3>Resultado Final</h3>
            <p>Magnitude Resultante: ${magnitudeResultante.toFixed(2)}</p>
            <p>Ângulo Resultante: ${anguloResultante.toFixed(2)}°</p>
        `;
    });
});





/// Certifique-se de que a biblioteca PDFLib esteja incluída no seu HTML:
// <script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>

const { PDFDocument, rgb } = PDFLib;

// Função para desenhar uma linha da tabela no PDF
function drawTableRow(page, y, data) {
    const rowHeight = 20;
    const columnWidth1 = 120;
    const columnWidth2 = 120;
    const columnWidth3 = 120;
    const columnWidth4 = 120;

    // Desenha retângulo para coluna 1
    page.drawRectangle({
        x: 50,
        y: y,
        width: columnWidth1,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });
    page.drawText(data.forca, { x: 55, y: y + 5, size: 12 });

    // Desenha retângulo para coluna 2
    page.drawRectangle({
        x: 50 + columnWidth1,
        y: y,
        width: columnWidth2,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });
    page.drawText(`${data.angulo}°`, { x: 55 + columnWidth1, y: y + 5, size: 12 });

    // Desenha retângulo para coluna 3
    page.drawRectangle({
        x: 50 + columnWidth1 + columnWidth2,
        y: y,
        width: columnWidth3,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });
    page.drawText(`${data.magnitude.toFixed(2)}`, { x: 55 + columnWidth1 + columnWidth2, y: y + 5, size: 12 });

    // Desenha retângulo para coluna 4
    page.drawRectangle({
        x: 50 + columnWidth1 + columnWidth2 + columnWidth3,
        y: y,
        width: columnWidth4,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });
    page.drawText(`${data.anguloResultante ? data.anguloResultante.toFixed(2) : 'N/A'}°`, { x: 55 + columnWidth1 + columnWidth2 + columnWidth3, y: y + 5, size: 12 });
}

document.getElementById('generatePdf').addEventListener('click', async function () {
    const doc = await PDFDocument.create();
    const page = doc.addPage([600, 500]);

    page.drawText('Calculadora de Esforço Urbano', { x: 50, y: 480, size: 24, color: rgb(0, 0, 0) });

    page.drawText('Forças e Resultados', { x: 50, y: 450, size: 18, color: rgb(0, 0, 0) });

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
        height: rowHeight * 6,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });

    // Cabeçalho da tabela
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
    page.drawText('Ângulo', { x: 55 + columnWidth1, y: tableStartY + 5, size: 12 });

    page.drawRectangle({
        x: 50 + columnWidth1 + columnWidth2,
        y: tableStartY,
        width: columnWidth3,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });
    page.drawText('Magnitude', { x: 55 + columnWidth1 + columnWidth2, y: tableStartY + 5, size: 12 });

    page.drawRectangle({
        x: 50 + columnWidth1 + columnWidth2 + columnWidth3,
        y: tableStartY,
        width: columnWidth4,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });
    page.drawText('Ângulo Resultante', { x: 55 + columnWidth1 + columnWidth2 + columnWidth3, y: tableStartY + 5, size: 12 });

    let currentY = tableStartY - rowHeight;
    const forces = window.pdfData.forcas || [];

    forces.forEach(force => {
        drawTableRow(page, currentY, {
            forca: `Força ${force.numero}`,
            angulo: force.angulo,
            magnitude: force.magnitude,
            anguloResultante: force.anguloResultante
        });
        currentY -= rowHeight;
    });

    page.drawText('Resultado Final', { x: 50, y: currentY - 20, size: 18, color: rgb(0, 0, 0) });

    page.drawText(`Magnitude Resultante: ${window.pdfData.magnitude.toFixed(2)}`, { x: 50, y: currentY - 50, size: 12 });
    page.drawText(`Ângulo Resultante: ${window.pdfData.anguloResultante.toFixed(2)}°`, { x: 50, y: currentY - 70, size: 12 });

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultado.pdf';
    link.click();
});
