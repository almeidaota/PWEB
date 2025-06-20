const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function buscarLivrosDaAPI(termo) {
  if (!termo) return [];

  const url = `${BASE_URL}?q=${encodeURIComponent(termo)}&langRestrict=pt&maxResults=10`;

  try {
    const resposta = await fetch(url);
    
    if (!resposta.ok) {
      throw new Error(`Erro na API Google Books: ${resposta.statusText}`);
    }
    
    const dados = await resposta.json();

    if (!dados.items) {
      return [];
    }

    return dados.items.map(livroApi => {
      const info = livroApi.volumeInfo;
      
      return {
        idApi: livroApi.id, 
        titulo: info.title || 'Título Desconhecido',
        autor: info.authors ? info.authors.join(', ') : 'Autor desconhecido',
        ano: info.publishedDate ? info.publishedDate.split('-')[0] : '', 
        paginas: info.pageCount || '',
        sinopse: info.description || '',
        capa: info.imageLinks?.thumbnail || '' 
      };
    });
  } catch (error) {
    console.error('Erro ao buscar livros na API (buscarLivrosDaAPI):', error);
    return [];
  }
}