// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCCW6ZSLxNw4uJR2ZkWjd5K21Z_2AHsENs",
    authDomain: "akraquercem.firebaseapp.com",
    projectId: "akraquercem",
    storageBucket: "akraquercem.appspot.com",
    messagingSenderId: "791956843896",
    appId: "1:791956843896:web:ebf55f3480b68d21722c8d"
  };
  
  // Inicializa o Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  console.log("Firebase inicializado corretamente.");

  // Função de login
  document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Autenticação com Firebase
      auth.signInWithEmailAndPassword(username, password)
          .then((userCredential) => {
              // Sucesso no login
              const user = userCredential.user;
              console.log('Login bem-sucedido:', user);
              alert('Login bem-sucedido!');
              window.location.href = 'index2_Bnv.html'; // Altere para a página de destino
          })
          .catch((error) => {
              // Erro no login
              console.error('Erro no login:', error.message);
              alert('Erro ao fazer login: ' + error.message);
          });
  });
  
  // Função de alternância para exibir o formulário de registro
  document.getElementById('showRegisterForm').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.login-container').style.display = 'none';
      document.querySelector('.register-container').style.display = 'block';
  });
  
  // Função de alternância para exibir o formulário de login
  document.getElementById('showLoginForm').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.register-container').style.display = 'none';
      document.querySelector('.login-container').style.display = 'block';
  });
  
  // Função de criação de nova conta
  document.getElementById('registerForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const registerUsername = document.getElementById('registerUsername').value;
      const registerPassword = document.getElementById('registerPassword').value;
  
      // Criação de conta com Firebase
      auth.createUserWithEmailAndPassword(registerUsername, registerPassword)
          .then((userCredential) => {
              // Sucesso na criação da conta
              const user = userCredential.user;
              console.log('Conta criada com sucesso:', user);
              alert('Conta criada com sucesso!');
              window.location.href = 'index2_Bnv.html'; // Altere para a página de destino
          })
          .catch((error) => {
              // Erro na criação da conta
              console.error('Erro ao criar conta:', error.message);
              alert('Erro ao criar conta: ' + error.message);
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
