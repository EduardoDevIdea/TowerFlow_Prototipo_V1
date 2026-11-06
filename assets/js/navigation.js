/* ============================================================
   TowerFlow — navigation.js
   Navegação da SPA: troca de abas, dropdown do usuário, filtros.
   Usado em: pages/app.html.
   ============================================================ */

/**
 * Troca a view ativa e destaca a aba correspondente.
 * @param {string} tabId - id da aba (ex.: 'home', 'moradores')
 */
function switchTab(tabId) {
  const views = document.querySelectorAll('.view-content');
  views.forEach(view => view.classList.add('hidden'));

  const targetView = document.getElementById('view-' + tabId);
  if (targetView) targetView.classList.remove('hidden');

  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => tab.classList.remove('is-active'));

  const activeTab = document.getElementById('tab-' + tabId);
  if (activeTab) activeTab.classList.add('is-active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Abre/fecha o dropdown do usuário.
 */
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  const arrow = document.getElementById('userMenuArrow');
  if (!dropdown || !arrow) return;

  const isOpen = dropdown.classList.toggle('is-open');
  arrow.classList.toggle('is-open', isOpen);
}

/**
 * Registra o listener para fechar o dropdown ao clicar fora.
 * Deve ser chamado no DOMContentLoaded do app.
 */
function registerClickOutsideHandler() {
  document.addEventListener('click', function (event) {
    const menuBtn = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    if (menuBtn && dropdown && !menuBtn.contains(event.target) && !dropdown.contains(event.target)) {
      if (dropdown.classList.contains('is-open')) {
        toggleUserMenu();
      }
    }
  });
}

/**
 * Filtra as linhas de uma tabela pelo valor digitado no input.
 * @param {string} inputId - id do input de busca
 * @param {string} tableId - id da tabela
 */
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const filter = input.value.toLowerCase();
  const table = document.getElementById(tableId);
  const tr = table.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) {
    let rowMatch = false;
    const td = tr[i].getElementsByTagName('td');
    for (let j = 0; j < td.length; j++) {
      if (td[j]) {
        const txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          rowMatch = true;
          break;
        }
      }
    }
    tr[i].style.display = rowMatch ? '' : 'none';
  }
}