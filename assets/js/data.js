/* ============================================================
   TowerFlow — data.js
   Dados mockados e persistência em localStorage.
   Usado em: pages/app.html.
   ============================================================ */

const STORAGE_PREFIX = 'towerflow_data_';

/* ============================================================
   Dados iniciais (seed)
   ============================================================ */
const SEED_DATA = {
  moradores: [
    { id: 1, nome: 'Ana', sobrenome: 'Albuquerque', torre: 'Torre A', unidade: 'Apt 101', interfone: '1010', telefone: '(11) 98765-4321' },
    { id: 2, nome: 'Bruno', sobrenome: 'Carvalho', torre: 'Torre A', unidade: 'Apt 304', interfone: '1034', telefone: '(11) 97654-3210' },
    { id: 3, nome: 'Carla', sobrenome: 'Menezes', torre: 'Torre B', unidade: 'Apt 202', interfone: '2020', telefone: '(11) 96543-2109' },
    { id: 4, nome: 'Daniel', sobrenome: 'Ferreira', torre: 'Torre B', unidade: 'Apt 501', interfone: '2051', telefone: '(11) 95432-1098' },
    { id: 5, nome: 'Eduardo', sobrenome: 'Santos', torre: 'Torre C', unidade: 'Apt 102', interfone: '3012', telefone: '(11) 94321-0987' },
    { id: 6, nome: 'Fernanda', sobrenome: 'Lima', torre: 'Torre D', unidade: 'Apt 804', interfone: '4084', telefone: '(11) 93210-9876' }
  ],
  torres: [
    { id: 1, nome: 'Torre A - Alvorada', numero: 'Bloco 01', sindico: 'Carlos Silva', contato: '(11) 98888-1111' },
    { id: 2, nome: 'Torre B - Bela Vista', numero: 'Bloco 02', sindico: 'Mariana Costa', contato: '(11) 98888-2222' },
    { id: 3, nome: 'Torre C - Copacabana', numero: 'Bloco 03', sindico: 'Roberto Rocha', contato: '(11) 98888-3333' },
    { id: 4, nome: 'Torre D - Dunas', numero: 'Bloco 04', sindico: 'Patrícia Souza', contato: '(11) 98888-4444' }
  ],
  unidades: [
    { id: 1, apartamento: 'Apt 101', torre: 'Torre A', interfone: '1010', situacao: 'Indisponível', ocupada: 'Sim', proprietario: 'Ana Albuquerque' },
    { id: 2, apartamento: 'Apt 102', torre: 'Torre A', interfone: '1012', situacao: 'Vende-se', ocupada: 'Não', proprietario: 'Marcos Oliveira' },
    { id: 3, apartamento: 'Apt 201', torre: 'Torre B', interfone: '2021', situacao: 'Aluga-se', ocupada: 'Não', proprietario: 'Juliana Paes' },
    { id: 4, apartamento: 'Apt 304', torre: 'Torre A', interfone: '1034', situacao: 'Indisponível', ocupada: 'Sim', proprietario: 'Bruno Carvalho' },
    { id: 5, apartamento: 'Apt 501', torre: 'Torre C', interfone: '3051', situacao: 'Indisponível', ocupada: 'Sim', proprietario: 'Daniel Ferreira' }
  ],
  veiculos: [
    { id: 1, placa: 'ABC-1D23', modelo: 'Hb20', marca: 'Hyundai', tipo: 'Carro', cor: 'Preto', proprietario: 'Ana Albuquerque', torre: 'Torre A', apartamento: 'Apt 101', contato: '(11) 98765-4321' },
    { id: 2, placa: 'JKXC-4F90', modelo: 'Kicks', marca: 'Nissan', tipo: 'Carro', cor: 'Azul', proprietario: 'Ana Albuquerque', torre: 'Torre A', apartamento: 'Apt 101', contato: '(11) 98765-4321' },
    { id: 3, placa: 'PTR-7B81', modelo: 'Civic', marca: 'Honda', tipo: 'Carro', cor: 'Marrom', proprietario: 'Ana Albuquerque', torre: 'Torre A', apartamento: 'Apt 101', contato: '(11) 98765-4321' },
    { id: 4, placa: 'XYZ-9E87', modelo: 'Corolla', marca: 'Toyota', tipo: 'Carro', cor: 'Prata', proprietario: 'Bruno Carvalho', torre: 'Torre A', apartamento: 'Apt 304', contato: '(11) 97654-3210' },
    { id: 5, placa: 'KJR-4F55', modelo: 'Compass', marca: 'Jeep', tipo: 'Carro', cor: 'Branco', proprietario: 'Carla Menezes', torre: 'Torre B', apartamento: 'Apt 202', contato: '(11) 96543-2109' },
    { id: 6, placa: 'MOT-2G11', modelo: 'CB 500F', marca: 'Honda', tipo: 'Motocicleta', cor: 'Vermelho', proprietario: 'Daniel Ferreira', torre: 'Torre B', apartamento: 'Apt 501', contato: '(11) 95432-1098' }
  ],
  visitantes: [
    { id: 1, nome: 'Gabriel Ramos', documento: '44.123.890-X', tipo: 'Visitante / Convidado', dataEntrada: '04/10/2026 14:30', torre: 'Torre A', apartamento: 'Apt 101', status: 'No Condomínio' },
    { id: 2, nome: 'Técnico Claro (Marcos)', documento: '33.987.112-4', tipo: 'Prestador de Serviço', dataEntrada: '04/10/2026 11:15', torre: 'Torre B', apartamento: 'Apt 202', status: 'Saída Registrada' },
    { id: 3, nome: 'Entregador iFood', documento: '55.333.111-9', tipo: 'Delivery', dataEntrada: '04/10/2026 17:45', torre: 'Torre A', apartamento: 'Apt 304', status: 'Em Trânsito' }
  ],
  ocorrencias: [
    { id: 1, titulo: 'Vazamento na garagem B1', categoria: 'Manutenção', morador: 'Bruno Carvalho (Apt 304)', data: '02/10/2026', prioridade: 'Alta', status: 'Em Andamento' },
    { id: 2, titulo: 'Barulho excessivo após 22h', categoria: 'Convivência', morador: 'Ana Albuquerque (Apt 101)', data: '01/10/2026', prioridade: 'Média', status: 'Resolvido' },
    { id: 3, titulo: 'Lâmpada queimada corredor 5º andar', categoria: 'Iluminação', morador: 'Daniel Ferreira (Apt 501)', data: '03/10/2026', prioridade: 'Baixa', status: 'Aberto' }
  ],
  contatos: [
    { id: 1, nome: 'Portaria Principal', cargo: 'Atendimento 24h', telefone: '(11) 3333-0001', email: 'portaria@condxpto.com.br', setor: 'Segurança' },
    { id: 2, nome: 'Eletricista Plantão (João)', cargo: 'Técnico Eletricista', telefone: '(11) 97777-8888', email: 'joao.eletrica@gmail.com', setor: 'Manutenção' },
    { id: 3, nome: 'Administradora XPTO', cargo: 'Gestão Financeira/Boleto', telefone: '(11) 3003-4004', email: 'contato@adminxpto.com.br', setor: 'Administração' }
  ],
  notificacoes: [
    { id: 1, titulo: 'Limpeza das Caixas d\'Água programada para Quinta-feira', destinatario: 'Todos os Moradores', data: '04/10/2026', status: 'Enviado' },
    { id: 2, titulo: 'Convocação para Assembleia Geral Ordinária (AGO)', destinatario: 'Proprietários', data: '28/09/2026', status: 'Enviado' },
    { id: 3, titulo: 'Manutenção preventiva dos elevadores da Torre B', destinatario: 'Torre B', data: '20/09/2026', status: 'Arquivado' }
  ],
  // ... (notificações existentes)

  condominios: [
    { id: 1, nome: 'Cond. XPTO', cnpj: '12.345.678/0001-90', telefonePortaria: '(11) 3333-0001', endereco: 'Rua das Flores, 123', cidade: 'São Paulo', uf: 'SP', ativo: true },
    { id: 2, nome: 'Cond. Alfa', cnpj: '98.765.432/0001-10', telefonePortaria: '(21) 2222-0002', endereco: 'Av. Atlântica, 456', cidade: 'Rio de Janeiro', uf: 'RJ', ativo: false },
    { id: 3, nome: 'Cond. Beta', cnpj: '11.222.333/0001-44', telefonePortaria: '(31) 4444-0003', endereco: 'Rua da Bahia, 789', cidade: 'Belo Horizonte', uf: 'MG', ativo: true }
  ],

  usuarios: [
    { id: 1, nome: 'Carlos', sobrenome: 'Silva', email: 'sindico@condxpto.com.br', tipo: 'Síndico', condominio: 'Cond. XPTO', ativo: true },
    { id: 2, nome: 'Maria', sobrenome: 'Souza', email: 'maria@condxpto.com.br', tipo: 'Portaria', condominio: 'Cond. XPTO', ativo: true },
    { id: 3, nome: 'João', sobrenome: 'Santos', email: 'joao@condalfa.com.br', tipo: 'Síndico', condominio: 'Cond. Alfa', ativo: false },
    { id: 4, nome: 'Suporte', sobrenome: 'Admin', email: 'suporte@towerflow.com', tipo: 'Suporte', condominio: '—', ativo: true }
  ]
};

/* ============================================================
   Funções genéricas de leitura / escrita no localStorage
   ============================================================ */

/**
 * Lê os dados de uma entidade. Se não houver nada no localStorage,
 * inicializa com o seed.
 * @param {string} entity - nome da entidade (ex.: 'moradores')
 * @returns {Array}
 */
function getData(entity) {
  const key = STORAGE_PREFIX + entity;
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      console.warn(`Dados corrompidos para ${entity}. Reinicializando.`);
    }
  }
  // Se não há dados, salva o seed e retorna
  const seed = SEED_DATA[entity] || [];
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

/**
 * Salva os dados de uma entidade no localStorage.
 * @param {string} entity
 * @param {Array} data
 */
function saveData(entity, data) {
  const key = STORAGE_PREFIX + entity;
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Gera um novo ID para a entidade (max + 1).
 * @param {string} entity
 * @returns {number}
 */
function nextId(entity) {
  const data = getData(entity);
  if (data.length === 0) return 1;
  return Math.max(...data.map(item => item.id)) + 1;
}

/**
 * Busca um registro pelo ID.
 * @param {string} entity
 * @param {number} id
 * @returns {object|undefined}
 */
function findById(entity, id) {
  return getData(entity).find(item => item.id === id);
}

/**
 * Remove um registro pelo ID.
 * @param {string} entity
 * @param {number} id
 */
function deleteById(entity, id) {
  const data = getData(entity);
  const filtered = data.filter(item => item.id !== id);
  saveData(entity, filtered);
}

/**
 * Reseta os dados de uma entidade para o seed (útil para testes).
 * @param {string} entity
 */
function resetData(entity) {
  localStorage.removeItem(STORAGE_PREFIX + entity);
  getData(entity); // reinicializa
}