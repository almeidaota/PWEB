let alunos = [];

document.getElementById('formAluno').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const ra = document.getElementById('ra').value.trim();
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    if (!validarNome(nome)) {
        alert('Nome inválido. Informe nome e sobrenome.');
        return;
    }

    if (!/^\d{5}$/.test(ra)) {
        alert('RA deve conter exatamente 5 dígitos numéricos.');
        return;
    }

    if (![nota1, nota2, nota3].every(n => n >= 0 && n <= 10)) {
        alert('Todas as notas devem estar entre 0 e 10.');
        return;
    }

    const media = ((nota1 + nota2 + nota3) / 3).toFixed(2);

    alunos.push({ nome, ra, media: parseFloat(media) });

    const lista = document.getElementById('listaAlunos');
    const li = document.createElement('li');
    li.textContent = `Aluno: ${nome} | RA: ${ra} | Média: ${media}`;
    lista.appendChild(li);

    document.getElementById('formAluno').reset();

    if (alunos.length === 10) {
        const mediaGeral = (alunos.reduce((acc, a) => acc + a.media, 0) / 10).toFixed(2);
        document.getElementById('mediaGeral').textContent = `Média Geral da Turma: ${mediaGeral}`;
        document.getElementById('formAluno').querySelector('button').disabled = true;
    }
});

function validarNome(nome) {
    const partes = nome.split(' ');
    return partes.length >= 2 && partes.every(p => p.length > 0);
}
