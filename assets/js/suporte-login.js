/* ============================================================
   TowerFlow — suporte-login.js
   Lógica específica da tela de login de suporte.
   Usado em: pages/suporte-login.html.
   ============================================================ */

function toggleSuportePassword() {
  const input = document.getElementById('suportePassword');
  const icon = document.getElementById('suporteTogglePasswordIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

function showSuporteError(message) {
  const box = document.getElementById('suporteLoginError');
  const text = document.getElementById('suporteLoginErrorText');
  const card = document.getElementById('suporteLoginCard');
  text.textContent = message;
  box.classList.add('is-visible');
  card.classList.remove('shake');
  void card.offsetWidth;
  card.classList.add('shake');
}

function hideSuporteError() {
  document.getElementById('suporteLoginError').classList.remove('is-visible');
}

function doSuporteLogin() {
  const user = document.getElementById('suporteUser').value.trim();
  const pass = document.getElementById('suportePassword').value;

  const userData = validateSuporteCredentials(user, pass);

  if (userData) {
    hideSuporteError();
    loginSuporteAndRedirect(user, userData, 'suporte-dashboard.html');
  } else {
    showSuporteError('Credenciais de suporte inválidas.');
    document.getElementById('suportePassword').value = '';
    document.getElementById('suportePassword').focus();
  }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function () {
  // Atalho: se já houver sessão de suporte, vai direto ao dashboard
  if (redirectIfSuporteLoggedIn('suporte-dashboard.html')) return;

  document.getElementById('suporteLoginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    doSuporteLogin();
  });

  document.getElementById('suporteLoginBtn').addEventListener('click', function (e) {
    e.preventDefault();
    doSuporteLogin();
  });

  document.getElementById('suporteUser').focus();
});