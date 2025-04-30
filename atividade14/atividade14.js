const textoInput = document.getElementById('texto');
const resultado = document.getElementById('resultado');
const transformarBtn = document.getElementById('transformar');

transformarBtn.addEventListener('click', () => {
    const texto = textoInput.value;
    if (document.getElementById('maiusculas').checked) {
        resultado.textContent = texto.toUpperCase(); 
    } else if (document.getElementById('minusculas').checked) {
        resultado.textContent = texto.toLowerCase();
    } else {
        resultado.textContent = 'Por favor, selecione uma opção de transformação.';
    }
});
