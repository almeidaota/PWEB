import { listarLivros, getLivro, addLivro, updateLivro, deleteLivro, buscarPorTitulo } from './crud.js';
import { buscarLivrosDaAPI } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.endsWith('/') || path.endsWith('/index.html')) {
    carregarListaLivrosLocais();
    setupIndexSearch();
  }

  if (path.includes('/form.html')) {
    setupFormPage();
  }

  if (path.includes('/detalhes.html')) {
    setupDetailsPage();
  }
});

function carregarListaLivrosLocais() {
  const livros = listarLivros();
  renderLivros(livros, 'lista-livros', 'Minha Estante');
}

function setupIndexSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;
  let searchTimeout;
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    const termoBusca = e.target.value.trim();
    searchTimeout = setTimeout(() => {
      const resultadosLocais = buscarPorTitulo(termoBusca);
      renderLivros(resultadosLocais, 'lista-livros', 'Resultados na sua Estante');
    }, 300);
  });
}

function setupFormPage() {
    const params = new URLSearchParams(window.location.search);
    const livroId = params.get('id');
    const form = document.getElementById('livro-form');
    const formTitle = document.getElementById('form-title');
    const apiSearchSection = document.getElementById('api-search-section');

    if (livroId) {
      formTitle.textContent = 'Editar Livro';
      apiSearchSection.style.display = 'none';
      const livro = getLivro(livroId);
      if (livro) {
        Object.keys(livro).forEach(key => {
          if (form.elements[key]) form.elements[key].value = livro[key];
        });
      }
    } else {
      formTitle.textContent = 'Adicionar Novo Livro';
      setupApiSearch();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const dadosForm = Object.fromEntries(new FormData(e.target).entries());
      if (!dadosForm.titulo) return alert('O Título é obrigatório!');
      
      if (livroId) {
        updateLivro(livroId, dadosForm);
        alert('Livro atualizado!');
      } else {
        dadosForm.dataAdicao = new Date().toISOString().split('T')[0];
        addLivro(dadosForm);
        alert('Livro adicionado!');
      }
      window.location.href = '/index.html';
    });
}

function setupDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const livroId = params.get('id');
    const livro = getLivro(livroId);

    if (!livro) {
      alert('Livro não encontrado!');
      window.location.href = '/index.html';
      return;
    }

    document.getElementById('detail-title').textContent = livro.titulo;
    document.getElementById('detail-img').src = livro.capa || '';
    document.getElementById('detail-autor').textContent = livro.autor;
    document.getElementById('detail-ano').textContent = livro.ano;
    document.getElementById('detail-paginas').textContent = livro.paginas;
    document.getElementById('detail-nota').textContent = livro.nota;
    document.getElementById('detail-sinopse').textContent = livro.sinopse;

    document.getElementById('btn-editar').href = `/pages/form.html?id=${livroId}`;
    document.getElementById('btn-excluir').addEventListener('click', () => {
      if (confirm(`Tem certeza que deseja excluir "${livro.titulo}"?`)) {
        deleteLivro(livroId);
        alert('Livro excluído!');
        window.location.href = '/index.html';
      }
    });
}

function renderLivros(lista, containerId, tituloSecao) {
  const container = document.getElementById(containerId);
  const titleListContainer = document.getElementById('titleList');
  if (!container || !titleListContainer) return;
  container.innerHTML = '';
  titleListContainer.innerHTML = '';

  const secao = container.closest('section');
  if (secao) {
    const h2 = secao.querySelector('h2');
    if (h2) h2.textContent = tituloSecao;
  }
  
  if (lista.length === 0) {
    container.innerHTML = `<p class="mensagem-vazia">Nenhum livro encontrado.</p>`;
    return;
  }

  lista.forEach(livro => {
    const nota = parseFloat(livro.nota) || 0;
    const notaEm5Estrelas = Math.round(nota / 2);
    let estrelasHTML = '';
    for (let i = 1; i <= 5; i++) {
        estrelasHTML += `<span class="estrela ${i <= notaEm5Estrelas ? 'cheia' : 'vazia'}">${i <= notaEm5Estrelas ? '★' : '☆'}</span>`;
    }
    const card = document.createElement('div');
    card.className = 'livro-card';
    card.innerHTML = `
      <a href="/pages/detalhes.html?id=${livro.id}">
        ${livro.capa ? `<img src="${livro.capa}" alt="Capa de ${livro.titulo}">` : '<div class="capa-placeholder"></div>'}
      </a>
      <div class="card-info">
        <h3><a href="/pages/detalhes.html?id=${livro.id}">${livro.titulo}</a></h3>
        <div class="book-rating">${estrelasHTML}</div>
      </div>
    `;
    container.appendChild(card);

    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="/pages/detalhes.html?id=${livro.id}">${livro.titulo}</a>`;
    titleListContainer.appendChild(listItem);
  });
}

function setupApiSearch() {
  const searchInput = document.getElementById('api-search-input');
  const apiSearchResults = document.getElementById('api-search-results');
  let debounceTimeout;

  searchInput.addEventListener('input', e => {
    clearTimeout(debounceTimeout);
    const termoBusca = e.target.value.trim();
    if (termoBusca.length < 3) {
      apiSearchResults.innerHTML = '';
      return;
    }
    debounceTimeout = setTimeout(async () => {
      apiSearchResults.innerHTML = '<p class="mensagem-vazia-pequena">Buscando...</p>';
      const livrosAPI = await buscarLivrosDaAPI(termoBusca);
      renderAPISearchResults(livrosAPI);
    }, 500);
  });
}

function renderAPISearchResults(results) {
  const container = document.getElementById('api-search-results');
  if(!container) return;
  container.innerHTML = '';
  if (results.length === 0) {
    container.innerHTML = '<p class="mensagem-vazia-pequena">Nenhum resultado.</p>';
    return;
  }
  const ul = document.createElement('ul');
  results.forEach(livroApi => {
    const li = document.createElement('li');
    li.innerHTML = `<a>${livroApi.titulo} <span>(${livroApi.ano})</span></a>`;
    li.addEventListener('click', () => {
      const form = document.getElementById('livro-form');
      Object.keys(livroApi).forEach(key => {
        if(form.elements[key]) form.elements[key].value = livroApi[key];
      });
      container.innerHTML = '';
    });
    ul.appendChild(li);
  });
  container.appendChild(ul);
}