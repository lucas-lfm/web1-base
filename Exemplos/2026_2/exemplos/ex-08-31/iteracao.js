console.log("Exemplos de metodos de iteração");

const numeros = [10, 20, 30, 45, 5, 43];

numeros.forEach((numero) => console.log(numero * 2));

const precos = [200, 100, 50, 60];

// MAP - executa uma transformação nos dados de entrada retornando um novo array
const precosComDesc = precos.map((preco) => preco * 0.9);
console.table(precosComDesc);
console.table(precos);

// FILTER - Executa uma função de filtragem nos dados de entrada
const resultado = precos.filter((preco) => preco < 100);
console.table(resultado);

// REDUCE - Executa uma função cumulativa nos dados de entrada,
// resultando em um único valor de saída
const valorTotal = precos.reduce((total, preco) => total + preco, 100);
console.log(valorTotal);
