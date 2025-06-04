const resultado = document.getElementById('resultado');
const btnEnviar = document.getElementById('idEnviar');

btnEnviar.addEventListener('click', () => {
    if (document.getElementById('idSim').checked) {
        resultado.textContent ="Volte sempre à está página!"; 
    } else if (document.getElementById('idNao').checked) {
        resultado.textContent ="Que bom que você voltou a visitar esta página!"
    } else {
        resultado.textContent = 'Por favor, selecione uma opção.';
    }
})

function validar_dados() {
    if (document.forms.formulario.elements[0].value == "" || document.forms.formulario.elements[0].value.length < 10) {
        alert("preencha os campos de dados!");
        document.getElementById("idNome").focus();;
        return false;
    };

    if (document.forms.formulario.elements[1].value == "" || document.forms.formulario.elements[1].value.indexOf('@') == -1 || document.forms.formulario1.elements["idEmail"].value.indexOf('.') == -1) {
        alert("preencha o email corretamente!");
        document.getElementById("idEmail").focus();
       return false;
    }

    if (document.forms.formulario.elements[2].value == "" || document.forms.formulario.elements[2].value.length < 20) {
        alert("precisa ter 20 caracteres no minimo no comentario");
        document.getElementById("idComentario").focus();
        return false;
    }

    return true;
}