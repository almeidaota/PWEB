
function maiorNumero(num1, num2, num3) {
    return Math.max(num1, num2, num3);
}



function ordemCrescente(num1, num2, num3) {
    let nums = [num1, num2, num3];
    let n = nums.length;

    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                
                let temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
            }
        }
    }
    
    return nums;
}


function idPalindromo(str) {
    const strMaiuscula = str.toUpperCase();
    const strInvertida = strMaiuscula.split('').reverse().join('');
    return strMaiuscula === strInvertida;
}


function triangulo(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        if (a === b && b === c) {
            return "Triângulo Equilátero";
        } else if (a === b || b === c || a === c) {
            return "Triângulo Isósceles";
        } else {
            return "Triângulo Escaleno";
        }
    } else {
        return "Não forma triangulo";
    }
}
