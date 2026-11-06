/* ============================================================
   TowerFlow — login.js
   Lógica específica da tela de login.
   Usado em: index.html.
   ============================================================ */

const VALID_USER = 'admin';
const VALID_PASS = '123';

function togglePassword() {
  const input = document.getElementById('loginPassword');
  const icon = document.getElementById('togglePasswordIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

function showError(message) {
  const box = document.getElementById('loginError');
  const text = document.getElementById('loginErrorText');
  const card = document.getElementById('loginCard');
  text.textContent = message;
  box.classList.add('is-visible');
  card.classList.remove('shake');
  void card.offsetWidth;
  card.classList.add('shake');
}

function hideError() {
  document.getElementById('loginError').classList.remove('is-visible');
}

function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPassword').value;

  if (user === VALID_USER && pass === VALID_PASS) {
    hideError();
    // Função de auth.js
    loginAndRedirect(user, 'pages/app.html');
  } else {
    showError('Usuário ou senha inválidos. Tente novamente.');
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginPassword').focus();
  }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function () {
  // Atalho: se já houver sessão, vai direto ao app
  if (redirectIfLoggedIn('pages/app.html')) return;

  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    doLogin();
  });
  document.getElementById('loginBtn').addEventListener('click', function (e) {
    e.preventDefault();
    doLogin();
  });
  document.getElementById('loginUser').focus();
});