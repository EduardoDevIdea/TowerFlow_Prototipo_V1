/* ============================================================
   TowerFlow — suporte-dashboard.js
   Lógica do painel de suporte (tabs, modais, renderização).
   Usado em: pages/suporte-dashboard.html.
   ============================================================ */

let suporteState = {
  entity: null,      // 'condominios' ou 'usuarios'
  mode: 'new',       // 'new' ou 'edit'
  id: null
};

/* ============================================================
   Tabs internas
   ============================================================ */
function switchSuporteTab(tabId) {
  // Esconde painéis e remove .is-active das tabs
  document.querySelectorAll('.suporte-panel').forEach(p => p.classList.remove('is-active'));
  document.querySelectorAll('.suporte-tab').forEach(t => t.classList.remove('is-active'));

  // Mostra painel alvo e ativa a tab
  const panel = document.getElementById('panel-' + tabId);
  if (panel) panel.classList.add('is-active');

  const tab = document.querySelector(`.suporte-tab[data-tab="${tabId}"]`);
  if (tab) tab.classList.add('is-active');
}

/* ============================================================
   Filtro de tabela
   ============================================================ */
function filterSuporteTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const filter = input.value.toLowerCase();
  const table = document.getElementById(tableId);
  const tr = table.querySelectorAll('tbody tr');

  tr.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
}

/* ============================================================
   Logout
   ============================================================ */
function handleLogoutSuporte() {
  logoutSuporteAndRedirect('suporte-login.html');
}

/* ============================================================
   MODAIS — abrir / fechar
   ============================================================ */
function closeCondominioModal() {
  document.getElementById('condominioModal').classList.remove('is-open');
}

function closeUsuarioModal() {
  document.getElementById('usuarioModal').classList.remove('is-open');
}

function closeSuporteConfirm() {
  document.getElementById('suporteConfirmModal').classList.remove('is-open');
}

/* ============================================================
   Placeholders — CRUD real no Passo 4 (Condomínios) e 5 (Usuários)
   ============================================================ */
function openNewCondominio() {
  suporteState = { entity: 'condominios', mode: 'new', id: null };
  document.getElementById('condominioModalTitle').textContent = 'Novo Condomínio';
  document.getElementById('condominioFormFields').innerHTML =
    '<div class="suporte-form-group suporte-form-grid--full"><label>Os campos serão carregados no Passo 4.</label></div>';
  document.getElementById('condominioModal').classList.add('is-open');
}

function openNewUsuario() {
  suporteState = { entity: 'usuarios', mode: 'new', id: null };
  document.getElementById('usuarioModalTitle').textContent = 'Novo Usuário';
  document.getElementById('usuarioFormFields').innerHTML =
    '<div class="suporte-form-group suporte-form-grid--full"><label>Os campos serão carregados no Passo 5.</label></div>';
  document.getElementById('usuarioModal').classList.add('is-open');
}

function saveCondominio() {
  alert('Salvar condomínio será implementado no Passo 4.');
}

function saveUsuario() {
  alert('Salvar usuário será implementado no Passo 5.');
}

function confirmSuporteDelete() {
  alert('Excluir será implementado no Passo 4/5.');
  closeSuporteConfirm();
}

/* ============================================================
   Renderização das tabelas (mock estático por enquanto)
   ============================================================ */
function renderCondominios() {
  const data = getData('condominios');
  const tbody = document.getElementById('condominios-tbody');

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="suporte-empty"><i class="fa-solid fa-building"></i>Nenhum condomínio cadastrado.</div></td></tr>';
    return;
  }

  tbody.innerHTML = data.map(c => `
    <tr>
      <td class="suporte-table__cell--strong">${c.nome}</td>
      <td><span class="suporte-table__cell--mono">${c.cnpj}</span></td>
      <td>${c.telefonePortaria || '—'}</td>
      <td>${c.cidade} / ${c.uf}</td>
      <td>
        ${c.ativo
          ? '<span class="suporte-badge suporte-badge--active"><i class="fa-solid fa-circle-check"></i> Ativo</span>'
          : '<span class="suporte-badge suporte-badge--inactive"><i class="fa-solid fa-circle-xmark"></i> Inativo</span>'}
      </td>
      <td class="col-acoes">
        <button class="suporte-action-btn suporte-action-btn--edit" onclick="editCondominio(${c.id})" aria-label="Editar">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="suporte-action-btn suporte-action-btn--delete" onclick="deleteCondominio(${c.id})" aria-label="Excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderUsuarios() {
  const data = getData('usuarios');
  const tbody = document.getElementById('usuarios-tbody');

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="suporte-empty"><i class="fa-solid fa-users"></i>Nenhum usuário cadastrado.</div></td></tr>';
    return;
  }

  tbody.innerHTML = data.map(u => `
    <tr>
      <td class="suporte-table__cell--strong">${u.nome} ${u.sobrenome}</td>
      <td class="suporte-table__cell--muted">${u.email}</td>
      <td><span class="suporte-badge suporte-badge--role">${u.tipo}</span></td>
      <td>${u.condominio}</td>
      <td>
        ${u.ativo
          ? '<span class="suporte-badge suporte-badge--active"><i class="fa-solid fa-circle-check"></i> Ativo</span>'
          : '<span class="suporte-badge suporte-badge--inactive"><i class="fa-solid fa-circle-xmark"></i> Inativo</span>'}
      </td>
      <td class="col-acoes">
        <button class="suporte-action-btn suporte-action-btn--edit" onclick="editUsuario(${u.id})" aria-label="Editar">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="suporte-action-btn suporte-action-btn--delete" onclick="deleteUsuario(${u.id})" aria-label="Excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function editCondominio(id) {
  alert('Editar condomínio será implementado no Passo 4.');
}

function deleteCondominio(id) {
  alert('Excluir condomínio será implementado no Passo 4.');
}

function editUsuario(id) {
  alert('Editar usuário será implementado no Passo 5.');
}

function deleteUsuario(id) {
  alert('Excluir usuário será implementado no Passo 5.');
}

/* ============================================================
   Toast
   ============================================================ */
function showSuporteToast(message, type = 'success') {
  const existing = document.getElementById('suporteToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'suporteToast';
  toast.className = `suporte-toast suporte-toast--${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('is-visible'));

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================================
   Inicialização
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Guarda de autenticação
  requireSuporteAuth('suporte-login.html');

  // Atualiza o header
  const session = getSuporteSession();
  if (session) {
    document.getElementById('suporteUserName').textContent = session.name || 'Suporte';
    document.getElementById('suporteUserRole').textContent = session.role || '';
  }

  // Renderiza as tabelas
  renderCondominios();
  renderUsuarios();

  // Fecha modais ao clicar no backdrop
  ['condominioModal', 'usuarioModal', 'suporteConfirmModal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', function (e) {
        if (e.target === this) this.classList.remove('is-open');
      });
    }
  });
});