import { getAll, saveAll } from './storage.js';

function gerarId() {
  return Date.now();
}

export function addLivro(livro) {
  const livros = getAll();
  livro.id = gerarId();
  livros.push(livro);
  saveAll(livros);
}

export function getLivro(id) {
  return getAll().find(l => l.id == id);
}

export function listarLivros() {
  return getAll();
}

export function updateLivro(id, novosDados) {
  const livros = getAll();
  const index = livros.findIndex(l => l.id == id);
  if (index !== -1) {
    livros[index] = { ...livros[index], ...novosDados, id: parseInt(id) };
    saveAll(livros);
  }
}

export function deleteLivro(id) {
  const livrosRestantes = getAll().filter(l => l.id != id);
  saveAll(livrosRestantes);
}

export function buscarPorTitulo(texto) {
  const livros = getAll();
  const termo = texto.toLowerCase();
  return livros.filter(livro =>
    livro.titulo && livro.titulo.toLowerCase().includes(termo)
  );
}