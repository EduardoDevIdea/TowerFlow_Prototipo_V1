/* ============================================================
   TowerFlow — app.js
   Modal de perfil, logout, permissões e inicialização do dashboard.
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

  logoutAndRedirect('../index.html');
}

/**
 * Aplica as permissões: remove o 'hidden' dos elementos
 * com data-require-write SOMENTE se o usuário tiver permissão.
 * Para usuários sem permissão, os elementos continuam ocultos.
 */
function applyPermissions() {
  const canWrite = hasWritePermission();
  const elements = document.querySelectorAll('[data-require-write]');

  elements.forEach(el => {
    if (canWrite) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

/**
 * Atualiza o nome/cargo no header com base na sessão.
 * (Opcional: se o usuário logado for admin ou master, mostra os dados.)
 */
/**
 * Atualiza o nome, cargo e e-mail no header/dropdown com base na sessão.
 */
function updateUserInfo() {
  const session = getSession();
  if (!session) return;

  // Nome e cargo no trigger do usuário (header)
  const nameEl = document.querySelector('.user-menu__name');
  const roleEl = document.querySelector('.user-menu__role');
  if (nameEl) nameEl.textContent = session.name || 'Usuário';
  if (roleEl) roleEl.textContent = session.role || '';

  // E-mail no dropdown
  const emailEl = document.getElementById('userDropdownEmail');
  if (emailEl) {
    emailEl.textContent = session.user === 'master'
      ? 'master@condxpto.com.br'
      : 'sindico@condxpto.com.br';
  }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function () {
  // 1. Guarda de autenticação
  requireAuth('../index.html');

  // 2. Atualiza o header com os dados do usuário logado
  updateUserInfo();

  // 3. Aplica as permissões (mostra/oculta botões de CRUD)
  applyPermissions();

  // 4. Inicializa a aba Home
  switchTab('home');

  // 5. Listener de clique fora do dropdown
  registerClickOutsideHandler();

  // 6. Fecha o modal ao clicar no backdrop
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.addEventListener('click', function (e) {
      if (e.target === this) closeProfileModal();
    });
  }
});