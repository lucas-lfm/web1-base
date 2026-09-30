let valorReal = Number(prompt("Digite o valor em reais:"));
let cotacao = Number(prompt("Digite a cotação atual do dólar:"));

let valorDolar = valorReal / cotacao;
console.log(`Valor da conversão em dólar: US$ ${valorDolar.toFixed(2)}`);