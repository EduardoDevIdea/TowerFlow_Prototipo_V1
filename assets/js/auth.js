/* ============================================================
   TowerFlow — auth.js
   Gestão de sessão (localStorage), tipos de usuário e permissões.
   Usado em: index.html e pages/app.html.
   ============================================================ */

const SESSION_KEY = 'towerflow_user';

/* ============================================================
   Tipos de usuário e permissões
   ============================================================ */

/**
 * Tipos de usuário suportados no protótipo.
 * - admin: Síndico (somente leitura)
 * - master: Administrador Geral (leitura + escrita)
 */
const USER_TYPES = {
  ADMIN: 'Sindico',
  MASTER: 'Administrador_Geral'
};

/**
 * Mapa de credenciais (protótipo; no real viria do backend).
 * A chave é o nome de usuário; o valor tem senha e tipo.
 */
const CREDENTIALS = {
  admin:  { password: '123', type: USER_TYPES.ADMIN,  name: 'Carlos Silva',   role: 'Síndico Geral' },
  master: { password: '123', type: USER_TYPES.MASTER, name: 'Master Admin',   role: 'Administrador Geral' }
};

/**
 * Verifica se o usuário logado tem permissão de escrita.
 * @returns {boolean} true se for master, false caso contrário
 */
function hasWritePermission() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session.type === USER_TYPES.MASTER;
  } catch {
    return false;
  }
}

/**
 * Retorna a sessão atual (ou null se não houver).
 * @returns {object|null}
 */
function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* ============================================================
   Funções de login / logout / guarda
   ============================================================ */

/**
 * Verifica se há sessão. Se não houver, redireciona para o login.
 * @param {string} loginPath - caminho relativo para o index.html
 */
function requireAuth(loginPath) {
  if (!getSession()) {
    window.location.replace(loginPath);
  }
}

/**
 * Valida as credenciais informadas.
 * @param {string} user - nome de usuário
 * @param {string} pass - senha
 * @returns {object|null} dados do usuário (type, name, role) ou null se inválido
 */
function validateCredentials(user, pass) {
  const cred = CREDENTIALS[user];
  if (!cred || cred.password !== pass) return null;
  return { type: cred.type, name: cred.name, role: cred.role };
}

/**
 * Grava a sessão e redireciona para o app.
 * @param {string} user - usuário logado
 * @param {object} userData - dados (type, name, role)
 * @param {string} appPath - caminho relativo para pages/app.html
 */
function loginAndRedirect(user, userData, appPath) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      user: user,
      type: userData.type,
      name: userData.name,
      role: userData.role,
      loggedAt: new Date().toISOString()
    })
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
 * @param {string} appPath - caminho relativo para pages/app.html
 * @returns {boolean} true se redirecionou, false caso contrário
 */
function redirectIfLoggedIn(appPath) {
  if (getSession()) {
    window.location.href = appPath;
    return true;
  }
  return false;
}