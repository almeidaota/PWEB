function calcularOperacoes() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);

    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let produto = num1 * num2;
    let divisao = num2 !== 0 ? (num1 / num2).toFixed(2) : "Divisão por zero!";
    let resto = num2 !== 0 ? num1 % num2 : "Não existe resto com zero!";

    document.getElementById("resultado").innerHTML = `
        <p><b>Soma:</b> ${soma}</p>
        <p><b>Subtração:</b> ${subtracao}</p>
        <p><b>Produto:</b> ${produto}</p>
        <p><b>Divisão:</b> ${divisao}</p>
        <p><b>Resto da divisão:</b> ${resto}</p>
    `;
}