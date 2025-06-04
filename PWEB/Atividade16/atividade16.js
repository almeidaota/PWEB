function abrirCurso() {
    const select = document.getElementById("cursos");
    const valor = select.value;
    const texto = select.options[select.selectedIndex].text;

    if (!valor) return; // se for o primeiro "option", não faz nada

    const confirmar = confirm(`Deseja abrir a página do curso: ${texto}?`);

    if (confirmar) {
        let conteudo = `
            <html>
            <head><title>${texto}</title></head>
            <body>
                <h2>${texto}</h2>
                <p>Informações sobre o curso de ${texto}:</p>
                <ul>
                    <li>Duração: 4 anos</li>
                    <li>Período: Noturno</li>
                    <li>Local: Fatec Sorocaba</li>
                </ul>
            </body>
            </html>
        `;
        let novaJanela = window.open("", "", "width=600,height=300");
        novaJanela.document.write(conteudo);
        novaJanela.document.close();
    }
}
