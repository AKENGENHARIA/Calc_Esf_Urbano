/* Bloco de Variaveis*/
//var vao1 = parseFloat(document.getElementById('span1_F1').value);
//variaveis força 1
var ang1 = parseFloat(document.getElementById('angle1_F1').value);
var redeMt1 = document.getElementById('rede_mt_F1').value;
var redeBt1 = document.getElementById('rede_bt_F1').value;
var nivelMt1 = document.getElementById('nivel_cruzeta_mt_F1').value;


//variaveis força 2
var ang2 = parseFloat(document.getElementById('angle2_F2').value);
var redeMt2 = document.getElementById('rede_mt_F2').value;
var redeBt2 = document.getElementById('rede_bt_F2').value;
var nivelMt2 = document.getElementById('nivel_cruzeta_mt_F2').value;

function calculate() {
             // soma as forças de F1
             
             var somaF1 = (redeMt1*nivelMt1) + redeBt1;
           
   
            
            // Convertendo ângulos para radianos
            const rad1 = ang1 * Math.PI / 180;
            const rad2 = ang2 * Math.PI / 180;
            
            // Calculando componentes dos vetores
            const x1 = somaF1 * Math.cos(rad1);
            const y1 = somaF1 * Math.sin(rad1);

            
            // Calculando vetor resultante
            const xResultante = x1 + x2;
            const yResultante = y1 + y2;
            
            // Calculando magnitude e ângulo do vetor resultante
            const magnitude = Math.sqrt(xResultante * xResultante + yResultante * yResultante);
            const anguloResultante = Math.atan2(yResultante, xResultante) * 180 / Math.PI;
            
            // Exibindo resultados
            document.getElementById('resultado').innerHTML = `
                <h3>Resultado do Cálculo</h3>
                <p><strong>Força 1:</strong></p>
                <p>Vão: ${vao1}</p>
                <p>Ângulo: ${ang1}°</p>
                <p>Rede MT: ${redeMt1}</p>
                <p>Rede BT: ${redeBt1}</p>
                <p><strong>Força 2 (Exemplo):</strong></p>
                <p>Vão: ${vao2}</p>
                <p>Ângulo: ${ang2}°</p>
                <p><strong>Vetor Resultante:</strong></p>
                <p>Magnitude: ${magnitude.toFixed(2)}</p>
                <p>Ângulo: ${anguloResultante.toFixed(2)}°</p>
            `;
        }
