function imc(peso, altura) {
    var imc = peso / (altura * altura);
    var resultado;

    if (imc < 18.5) {
        resultado = "Magreza";
    } else if (imc < 25) {
        resultado = "Normal";
    } else if (imc < 30) {
        resultado = "Sobrepeso";
    } else if (imc < 40) {
        resultado = "Obesidade";
    } else {
        resultado = "Obesidade Grave";
    }

    return resultado + " (IMC: " + imc.toFixed(2) + ")";
}

function calcularIMC() {
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);


    var resultado = imc(peso, altura);
    document.getElementById("resultado").innerText = resultado;
}