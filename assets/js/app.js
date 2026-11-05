/* ============================================================
   TowerFlow — app.js
   Modal de perfil, logout e inicialização do dashboard.
   Usado em: pages/app.html.
   ============================================================ */

/**
 * Abre o modal de perfil.
 */
function openProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.add('is-open');
}

/**
 * Fecha o modal de perfil.
 */
function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.remove('is-open');
}

/**
 * Faz logout: fecha dropdown/modal, limpa sessão e vai ao login.
 */
function handleLogout() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.remove('is-open');
  const arrow = document.getElementById('userMenuArrow');
  if (arrow) arrow.classList.remove('is-open');

  const profileModal = document.getElementById('profileModal');
  if (profileModal) profileModal.classList.remove('is-open');

  // Função de auth.js
  logoutAndRedirect('../index.html');
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function () {
  // 1. Guarda de autenticação
  requireAuth('../index.html');

  // 2. Inicializa a aba Home
  switchTab('home');

  // 3. Listener de clique fora do dropdown
  registerClickOutsideHandler();

  // 4. Fecha o modal ao clicar no backdrop
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.addEventListener('click', function (e) {
      if (e.target === this) closeProfileModal();
    });
  }
});