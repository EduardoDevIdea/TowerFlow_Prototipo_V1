/* ============================================================
   TowerFlow — app.js
   Modal de perfil, logout, permissões e inicialização do dashboard.
   Usado em: pages/app.html.
   ============================================================ */

/* ============================================================
   1. MODAL DE PERFIL
   ============================================================ */

function openProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.add('is-open');
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.remove('is-open');
}

/* ============================================================
   2. LOGOUT
   ============================================================ */

function handleLogout() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.remove('is-open');
  const arrow = document.getElementById('userMenuArrow');
  if (arrow) arrow.classList.remove('is-open');

  const profileModal = document.getElementById('profileModal');
  if (profileModal) profileModal.classList.remove('is-open');

  logoutAndRedirect('../index.html');
}

/* ============================================================
   3. PERMISSÕES
   ============================================================ */

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

function updateUserInfo() {
  const session = getSession();
  if (!session) return;

  const nameEl = document.querySelector('.user-menu__name');
  const roleEl = document.querySelector('.user-menu__role');
  if (nameEl) nameEl.textContent = session.name || 'Usuário';
  if (roleEl) roleEl.textContent = session.role || '';

  const emailEl = document.getElementById('userDropdownEmail');
  if (emailEl) {
    emailEl.textContent = session.user === 'master'
      ? 'master@condxpto.com.br'
      : 'sindico@condxpto.com.br';
  }
}

/* ============================================================
   4. FECHAR MODAIS DE CRUD (usados pelos botões "Cancelar" e "X")
   ============================================================ */

function closeCrudModal() {
  const modal = document.getElementById('crudModal');
  if (modal) modal.classList.remove('is-open');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirmModal');
  if (modal) modal.classList.remove('is-open');
}

/* ============================================================
   5. CRUD — Estado e configuração
   ============================================================ */

let crudState = {
  entity: null,
  mode: 'new',  // 'new', 'edit' ou 'delete'
  id: null
};

const CRUD_FIELDS = {
  moradores: [
    { name: 'nome',       label: 'Nome',       type: 'text', required: true },
    { name: 'sobrenome',  label: 'Sobrenome',  type: 'text', required: true },
    { name: 'torre',      label: 'Torre',      type: 'select', required: true, options: ['Torre A', 'Torre B', 'Torre C', 'Torre D'] },
    { name: 'unidade',    label: 'Unidade',    type: 'text', required: true },
    { name: 'interfone',  label: 'Interfone',  type: 'text', required: false },
    { name: 'telefone',   label: 'Telefone',   type: 'text', required: false }
  ],
  torres: [
    { name: 'nome',     label: 'Nome',     type: 'text', required: true },
    { name: 'numero',   label: 'Número',   type: 'text', required: true },
    { name: 'sindico',  label: 'Síndico',  type: 'text', required: true },
    { name: 'contato',  label: 'Contato',  type: 'text', required: true }
  ],
  unidades: [
    { name: 'apartamento',   label: 'Apartamento',   type: 'text', required: true },
    { name: 'torre',         label: 'Torre',         type: 'select', required: true, options: ['Torre A', 'Torre B', 'Torre C', 'Torre D'] },
    { name: 'interfone',     label: 'Interfone',     type: 'text', required: true },
    { name: 'situacao',      label: 'Situação',      type: 'select', required: true, options: ['Indisponível', 'Vende-se', 'Aluga-se'] },
    { name: 'ocupada',       label: 'Ocupada',       type: 'select', required: true, options: ['Sim', 'Não'] },
    { name: 'proprietario',  label: 'Proprietário',  type: 'text', required: true }
  ],
  veiculos: [
    { name: 'placa',        label: 'Placa',        type: 'text', required: true },
    { name: 'modelo',       label: 'Modelo',       type: 'text', required: true },
    { name: 'marca',        label: 'Marca',        type: 'text', required: true },
    { name: 'tipo',         label: 'Tipo',         type: 'select', required: true, options: ['Carro', 'Motocicleta', 'SUV', 'Caminhonete'] },
    { name: 'cor',          label: 'Cor',          type: 'text', required: true },
    { name: 'proprietario', label: 'Proprietário', type: 'text', required: true },
    { name: 'torre',        label: 'Torre',        type: 'select', required: true, options: ['Torre A', 'Torre B', 'Torre C', 'Torre D'] },
    { name: 'apartamento',  label: 'Apartamento',  type: 'text', required: true },
    { name: 'contato',      label: 'Contato',      type: 'text', required: false }
  ],
  visitantes: [
    { name: 'nome',        label: 'Nome',              type: 'text', required: true },
    { name: 'documento',   label: 'Documento',         type: 'text', required: true },
    { name: 'tipo',        label: 'Tipo',              type: 'select', required: true, options: ['Visitante / Convidado', 'Prestador de Serviço', 'Delivery'] },
    { name: 'dataEntrada', label: 'Data/Hora Entrada', type: 'text', required: true },
    { name: 'torre',       label: 'Torre',             type: 'select', required: true, options: ['Torre A', 'Torre B', 'Torre C', 'Torre D'] },
    { name: 'apartamento', label: 'Apartamento',       type: 'text', required: true },
    { name: 'status',      label: 'Status',            type: 'select', required: true, options: ['No Condomínio', 'Saída Registrada', 'Em Trânsito'] }
  ],
  ocorrencias: [
    { name: 'titulo',     label: 'Título',     type: 'text', required: true },
    { name: 'categoria',  label: 'Categoria',  type: 'text', required: true },
    { name: 'morador',    label: 'Morador',    type: 'text', required: true },
    { name: 'data',       label: 'Data',       type: 'text', required: true },
    { name: 'prioridade', label: 'Prioridade', type: 'select', required: true, options: ['Alta', 'Média', 'Baixa'] },
    { name: 'status',     label: 'Status',     type: 'select', required: true, options: ['Aberto', 'Em Andamento', 'Resolvido'] }
  ],
  contatos: [
    { name: 'nome',     label: 'Nome / Empresa', type: 'text', required: true },
    { name: 'cargo',    label: 'Cargo / Função', type: 'text', required: true },
    { name: 'telefone', label: 'Telefone',       type: 'text', required: true },
    { name: 'email',    label: 'E-mail',         type: 'email', required: true },
    { name: 'setor',    label: 'Setor',          type: 'text', required: true }
  ],
  notificacoes: [
    { name: 'titulo',       label: 'Título do Comunicado', type: 'text', required: true },
    { name: 'destinatario', label: 'Destinatário',         type: 'text', required: true },
    { name: 'data',         label: 'Data',                 type: 'text', required: true },
    { name: 'status',       label: 'Status',               type: 'select', required: true, options: ['Enviado', 'Arquivado'] }
  ]
};

/* ============================================================
   6. CONSTRUÇÃO DOS CAMPOS DO FORMULÁRIO
   ============================================================ */

function buildFormFields(entity, values = {}) {
  const fields = CRUD_FIELDS[entity] || [];
  return fields.map(field => {
    const val = values[field.name] || '';
    const required = field.required ? '<span class="required">*</span>' : '';
    const label = `<label for="field-${field.name}">${field.label}${required}</label>`;

    let input;
    if (field.type === 'select') {
      const options = field.options.map(opt =>
        `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`
      ).join('');
      input = `<select id="field-${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>
        <option value="">Selecione...</option>
        ${options}
      </select>`;
    } else {
      input = `<input type="${field.type}" id="field-${field.name}" name="${field.name}"
        value="${val}" class="form-control" ${field.required ? 'required' : ''} />`;
    }

    return `<div class="form-group">${label}${input}</div>`;
  }).join('');
}

/* ============================================================
   7. ABERTURA DOS MODAIS
   ============================================================ */

function openCrudModal(entity) {
  crudState = { entity, mode: 'new', id: null };

  const modal = document.getElementById('crudModal');
  const title = document.getElementById('crudModalTitle');
  const fieldsContainer = document.getElementById('crudFormFields');
  const saveBtn = document.getElementById('crudSaveBtn');

  const entityNames = {
    moradores: 'Morador', torres: 'Torre', unidades: 'Unidade',
    veiculos: 'Veículo', visitantes: 'Visitante', ocorrencias: 'Ocorrência',
    contatos: 'Contato', notificacoes: 'Notificação'
  };
  const nameSingular = entityNames[entity] || entity;
  title.textContent = `Novo ${nameSingular}`;
  saveBtn.textContent = 'Salvar';

  fieldsContainer.innerHTML = buildFormFields(entity);

  modal.classList.add('is-open');
}

function editCrudModal(entity, id) {
  const item = findById(entity, id);
  if (!item) {
    alert('Registro não encontrado.');
    return;
  }

  crudState = { entity, mode: 'edit', id };

  const modal = document.getElementById('crudModal');
  const title = document.getElementById('crudModalTitle');
  const fieldsContainer = document.getElementById('crudFormFields');
  const saveBtn = document.getElementById('crudSaveBtn');

  const entityNames = {
    moradores: 'Morador', torres: 'Torre', unidades: 'Unidade',
    veiculos: 'Veículo', visitantes: 'Visitante', ocorrencias: 'Ocorrência',
    contatos: 'Contato', notificacoes: 'Notificação'
  };
  const nameSingular = entityNames[entity] || entity;
  title.textContent = `Editar ${nameSingular}`;
  saveBtn.textContent = 'Salvar Alterações';

  fieldsContainer.innerHTML = buildFormFields(entity, item);

  modal.classList.add('is-open');
}

function openConfirmDelete(entity, id) {
  const item = findById(entity, id);
  if (!item) {
    alert('Registro não encontrado.');
    return;
  }

  crudState = { entity, mode: 'delete', id };

  const nameField = {
    moradores: 'nome', torres: 'nome', unidades: 'apartamento',
    veiculos: 'placa', visitantes: 'nome', ocorrencias: 'titulo',
    contatos: 'nome', notificacoes: 'titulo'
  }[entity];
  const itemName = item[nameField] || item.nome || item.titulo || 'registro';

  document.getElementById('confirmItemName').textContent = itemName;
  document.getElementById('confirmModal').classList.add('is-open');
}

/* ============================================================
   8. WRAPPERS POR ENTIDADE
   ============================================================ */

// Moradores
function openNewMorador() { openCrudModal('moradores'); }
function editMorador(id) { editCrudModal('moradores', id); }
function deleteMorador(id) { openConfirmDelete('moradores', id); }

// Torres
function openNewTorre() { openCrudModal('torres'); }
function editTorre(id) { editCrudModal('torres', id); }
function deleteTorre(id) { openConfirmDelete('torres', id); }

// Unidades
function openNewUnidade() { openCrudModal('unidades'); }
function editUnidade(id) { editCrudModal('unidades', id); }
function deleteUnidade(id) { openConfirmDelete('unidades', id); }

// Veículos
function openNewVeiculo() { openCrudModal('veiculos'); }
function editVeiculo(id) { editCrudModal('veiculos', id); }
function deleteVeiculo(id) { openConfirmDelete('veiculos', id); }

// Visitantes
function openNewVisitante() { openCrudModal('visitantes'); }
function editVisitante(id) { editCrudModal('visitantes', id); }
function deleteVisitante(id) { openConfirmDelete('visitantes', id); }

// Ocorrências
function openNewOcorrencia() { openCrudModal('ocorrencias'); }
function editOcorrencia(id) { editCrudModal('ocorrencias', id); }
function deleteOcorrencia(id) { openConfirmDelete('ocorrencias', id); }

// Contatos
function openNewContato() { openCrudModal('contatos'); }
function editContato(id) { editCrudModal('contatos', id); }
function deleteContato(id) { openConfirmDelete('contatos', id); }

// Notificações
function openNewNotificacao() { openCrudModal('notificacoes'); }
function editNotificacao(id) { editCrudModal('notificacoes', id); }
function deleteNotificacao(id) { openConfirmDelete('notificacoes', id); }

/* ============================================================
   9. SALVAR / EXCLUIR (placeholders do Passo 4.1)
   ============================================================ */

function saveCrud() {
  alert(`Salvar (${crudState.mode}) — será implementado no Passo 4.2.`);
}

function confirmDelete() {
  alert(`Excluir ${crudState.entity} id=${crudState.id} — será implementado no Passo 4.2.`);
  closeConfirmModal();
}

/* ============================================================
   10. INICIALIZAÇÃO
   ============================================================ */

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

  // 6. Fecha o modal de perfil ao clicar no backdrop
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.addEventListener('click', function (e) {
      if (e.target === this) closeProfileModal();
    });
  }

  // 7. Fecha o modal de CRUD ao clicar no backdrop
  const crudModal = document.getElementById('crudModal');
  if (crudModal) {
    crudModal.addEventListener('click', function (e) {
      if (e.target === this) closeCrudModal();
    });
  }

  // 8. Fecha o modal de confirmação ao clicar no backdrop
  const confirmModal = document.getElementById('confirmModal');
  if (confirmModal) {
    confirmModal.addEventListener('click', function (e) {
      if (e.target === this) closeConfirmModal();
    });
  }
});