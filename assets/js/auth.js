/* ============================================================
   TowerFlow — auth.js
   Gestão de sessão (localStorage) e redirecionamentos.
   Usado em: index.html e pages/app.html.
   ============================================================ */

const SESSION_KEY = 'towerflow_user';

/**
 * Verifica se existe sessão. Se não existir, redireciona para o login.
 * @param {string} loginPath - caminho relativo para o index.html
 */
function requireAuth(loginPath) {
  if (!localStorage.getItem(SESSION_KEY)) {
    window.location.replace(loginPath);
  }
}

/**
 * Grava a sessão e redireciona para o app.
 * @param {string} user - usuário logado
 * @param {string} appPath - caminho relativo para pages/app.html
 */
function loginAndRedirect(user, appPath) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ user: user, loggedAt: new Date().toISOString() })
  );
  window.location.href = appPath;
}

/**
 * Limpa a sessão e redireciona para o login.
 * @param {string} loginPath - caminho relativo para o index.html
 */
function logoutAndRedirect(loginPath) {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = loginPath;
}

/**
 * Se já houver sessão, redireciona direto ao app.
 * Retorna true se redirecionou, false se ficou na página.
 * @param {string} appPath - caminho relativo para pages/app.html
 */
function redirectIfLoggedIn(appPath) {
  if (localStorage.getItem(SESSION_KEY)) {
    window.location.href = appPath;
    return true;
  }
  return false;
}