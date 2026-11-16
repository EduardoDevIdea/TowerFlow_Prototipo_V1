/* ============================================================
   TowerFlow — suporte-dashboard.js
   Lógica do painel de suporte (tabs, modais, CRUD simulado).
   Usado em: pages/suporte-dashboard.html.
   ============================================================ */

let suporteState = {
  entity: null,
  mode: 'new',
  id: null
};

/* ============================================================
   Mensagem amigável padrão (protótipo, sem persistência)
   ============================================================ */
const PROTO_MESSAGE =
  'Seus dados foram validados com sucesso! Mas como você está navegando em um protótipo, essa informação não ficará salva de verdade. Obrigado por testar!';

/* ============================================================
   Configuração dos campos de cada entidade
   ============================================================ */
const SUPORTE_FIELDS = {
  condominios: [
    { name: 'nome',             label: 'Nome',             type: 'text', required: true, full: true },
    { name: 'cnpj',             label: 'CNPJ',             type: 'text', required: true },
    { name: 'telefonePortaria', label: 'Telefone da Portaria', type: 'text', required: false },
    { name: 'endereco',         label: 'Endereço',         type: 'text', required: true, full: true },
    { name: 'cidade',           label: 'Cidade',           type: 'text', required: true },
    { name: 'uf',               label: 'Estado (UF)',      type: 'text', required: true },
    { name: 'ativo',            label: 'Ativo',            type: 'checkbox', required: false }
  ],
  usuarios: [
    { name: 'nome',        label: 'Nome',        type: 'text',  required: true },
    { name: 'sobrenome',   label: 'Sobrenome',   type: 'text',  required: true },
    { name: 'email',       label: 'E-mail',      type: 'email', required: true, full: true },
    { name: 'tipo',        label: 'Tipo',        type: 'select', required: true, options: ['Síndico', 'Portaria', 'Suporte', 'Administrador_Geral'] },
    { name: 'condominio',  label: 'Condomínio',  type: 'select', required: true, options: ['Cond. XPTO', 'Cond. Alfa', 'Cond. Beta', '—'] },
    { name: 'senha',       label: 'Senha',       type: 'password', required: true, full: true, note: 'No sistema real, a senha será tratada pela API com hash.' },
    { name: 'ativo',       label: 'Ativo',       type: 'checkbox', required: false }
  ]
};

/* ============================================================
   Tabs internas
   ============================================================ */
function switchSuporteTab(tabId) {
  document.querySelectorAll('.suporte-panel').forEach(p => p.classList.remove('is-active'));
  document.querySelectorAll('.suporte-tab').forEach(t => t.classList.remove('is-active'));

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
   Fechar modais
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
   Construção dos campos do formulário
   ============================================================ */
function buildSuporteFormFields(entity, values = {}) {
  const fields = SUPORTE_FIELDS[entity] || [];
  return fields.map(field => {
    const val = values[field.name] !== undefined ? values[field.name] : '';
    const required = field.required ? '<span class="required">*</span>' : '';
    const label = `<label for="field-${field.name}">${field.label}${required}</label>`;
    const gridClass = field.full ? 'suporte-form-group suporte-form-grid--full' : 'suporte-form-group';

    let input;
    if (field.type === 'checkbox') {
      const checked = val === true ? 'checked' : '';
      input = `<label class="suporte-form-checkbox">
        <input type="checkbox" id="field-${field.name}" name="${field.name}" ${checked} />
        <span>Ativo</span>
      </label>`;
    } else if (field.type === 'select') {
      const options = field.options.map(opt =>
        `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`
      ).join('');
      input = `<select id="field-${field.name}" name="${field.name}" class="suporte-form-control" ${field.required ? 'required' : ''}>
        <option value="">Selecione...</option>
        ${options}
      </select>`;
    } else {
      input = `<input type="${field.type}" id="field-${field.name}" name="${field.name}"
        value="${val}" class="suporte-form-control" ${field.required ? 'required' : ''} placeholder="Digite ${field.label.toLowerCase()}" />`;
    }

    let note = '';
    if (field.note) {
      note = `<div class="suporte-modal__note"><i class="fa-solid fa-circle-info"></i><span>${field.note}</span></div>`;
    }

    return `<div class="${gridClass}">${label}${input}${note}</div>`;
  }).join('');
}

/* ============================================================
   Abrir modais
   ============================================================ */
function openNewCondominio() {
  suporteState = { entity: 'condominios', mode: 'new', id: null };
  document.getElementById('condominioModalTitle').textContent = 'Novo Condomínio';
  document.getElementById('condominioFormFields').innerHTML =
    buildSuporteFormFields('condominios', { ativo: true });
  document.getElementById('condominioModal').classList.add('is-open');
}

function openNewUsuario() {
  suporteState = { entity: 'usuarios', mode: 'new', id: null };
  document.getElementById('usuarioModalTitle').textContent = 'Novo Usuário';
  document.getElementById('usuarioFormFields').innerHTML =
    buildSuporteFormFields('usuarios', { ativo: true });
  document.getElementById('usuarioModal').classList.add('is-open');
}

/* ============================================================
   Editar — preenche o modal com os dados do registro
   ============================================================ */
function editCondominio(id) {
  const data = getData('condominios');
  const item = data.find(c => c.id === id);
  if (!item) { showSuporteToast('Registro não encontrado.', 'error'); return; }

  suporteState = { entity: 'condominios', mode: 'edit', id };
  document.getElementById('condominioModalTitle').textContent = 'Editar Condomínio';
  document.getElementById('condominioFormFields').innerHTML =
    buildSuporteFormFields('condominios', item);
  document.getElementById('condominioModal').classList.add('is-open');
}

function editUsuario(id) {
  const data = getData('usuarios');
  const item = data.find(u => u.id === id);
  if (!item) { showSuporteToast('Registro não encontrado.', 'error'); return; }

  suporteState = { entity: 'usuarios', mode: 'edit', id };
  document.getElementById('usuarioModalTitle').textContent = 'Editar Usuário';
  document.getElementById('usuarioFormFields').innerHTML =
    buildSuporteFormFields('usuarios', item);
  document.getElementById('usuarioModal').classList.add('is-open');
}

/* ============================================================
   Salvar — valida, fecha, mostra toast AMIGÁVEL e NÃO persiste
   ============================================================ */
function validateForm(entity) {
  const fields = SUPORTE_FIELDS[entity] || [];
  for (const f of fields) {
    const input = document.getElementById('field-' + f.name);
    if (!input) continue;

    if (f.type === 'checkbox') continue;

    if (f.required && !input.value.trim()) {
      showSuporteToast(`Preencha o campo "${f.label}".`, 'error');
      input.focus();
      return false;
    }
  }
  return true;
}

function saveCondominio() {
  if (!validateForm('condominios')) return;

  closeCondominioModal();
  showSuporteToast(PROTO_MESSAGE, 'success');
}

function saveUsuario() {
  if (!validateForm('usuarios')) return;

  closeUsuarioModal();
  showSuporteToast(PROTO_MESSAGE, 'success');
}

/* ============================================================
   Excluir — abre confirmação, mostra toast AMIGÁVEL e NÃO remove
   ============================================================ */
function deleteCondominio(id) {
  const data = getData('condominios');
  const item = data.find(c => c.id === id);
  if (!item) return;

  suporteState = { entity: 'condominios', mode: 'delete', id };
  document.getElementById('suporteConfirmItemName').textContent = item.nome;
  document.getElementById('suporteConfirmModal').classList.add('is-open');
}

function deleteUsuario(id) {
  const data = getData('usuarios');
  const item = data.find(u => u.id === id);
  if (!item) return;

  suporteState = { entity: 'usuarios', mode: 'delete', id };
  document.getElementById('suporteConfirmItemName').textContent = `${item.nome} ${item.sobrenome}`;
  document.getElementById('suporteConfirmModal').classList.add('is-open');
}

function confirmSuporteDelete() {
  closeSuporteConfirm();
  showSuporteToast(PROTO_MESSAGE, 'success');
}

/* ============================================================
   Renderização das tabelas (sempre com o seed, pois não há persistência)
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

/* ============================================================
   Toast escuro
   ============================================================ */
function showSuporteToast(message, type = 'success') {
  const existing = document.getElementById('suporteToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'suporteToast';
  toast.className = `suporte-toast suporte-toast--${type}`;
  toast.style.maxWidth = '22rem';
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('is-visible'));

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }, 5000); // 5s, porque a mensagem é longa
}

/* ============================================================
   Inicialização
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  requireSuporteAuth('suporte-login.html');

  const session = getSuporteSession();
  if (session) {
    document.getElementById('suporteUserName').textContent = session.name || 'Suporte';
    document.getElementById('suporteUserRole').textContent = session.role || '';
  }

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