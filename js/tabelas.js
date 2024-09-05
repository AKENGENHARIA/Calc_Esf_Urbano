document.addEventListener('DOMContentLoaded', function () {
    const results = JSON.parse(localStorage.getItem('vetorResultados'));

    if (results) {
      // Preencher os valores para Força 1
      document.getElementById('f1-angle').innerText = results.ang1;
      document.getElementById('f1-redeMt').innerText = results.redeMt1Id;
      document.getElementById('f1-redeBt').innerText = results.redeBt1Id;
      document.getElementById('f1-x').innerText = results.x1.toFixed(2);
      document.getElementById('f1-y').innerText = results.y1.toFixed(2);
      
      // Preencher os valores para Força 2
      document.getElementById('f2-angle').innerText = results.ang2;
      document.getElementById('f2-redeMt').innerText = results.redeMt2Id;
      document.getElementById('f2-redeBt').innerText = results.redeBt2Id;
      document.getElementById('f2-x').innerText = results.x2.toFixed(2);
      document.getElementById('f2-y').innerText = results.y2.toFixed(2);

      // Preencher os valores para Força 3
      document.getElementById('f3-angle').innerText = results.ang3;
      document.getElementById('f3-redeMt').innerText = results.redeMt3Id;
      document.getElementById('f3-redeBt').innerText = results.redeBt3Id;
      document.getElementById('f3-x').innerText = results.x3.toFixed(2);
      document.getElementById('f3-y').innerText = results.y3.toFixed(2);

      // Preencher os valores para Força 4
      document.getElementById('f4-angle').innerText = results.ang4;
      document.getElementById('f4-redeMt').innerText = results.redeMt4Id;
      document.getElementById('f4-redeBt').innerText = results.redeBt4Id;
      document.getElementById('f4-x').innerText = results.x4.toFixed(2);
      document.getElementById('f4-y').innerText = results.y4.toFixed(2);

      // Preencher os valores para Força 5
      document.getElementById('f5-angle').innerText = results.ang5;
      document.getElementById('f5-redeMt').innerText = results.redeMt5Id;
      document.getElementById('f5-redeBt').innerText = results.redeBt5Id;
      document.getElementById('f5-x').innerText = results.x5.toFixed(2);
      document.getElementById('f5-y').innerText = results.y5.toFixed(2);

      // Preencher o vetor resultante e o ângulo
      document.getElementById('magnitude-resultante').innerText = results.magnitudeResultante;
      document.getElementById('angulo-resultante').innerText = results.anguloResultante;
    }
});