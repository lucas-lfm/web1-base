const numeros = [10, 20, 30, 40, 50];
const nomes = ["Matheus", "Joao", "Silva"];

// Operaçoes em arrays
console.log(numeros[1]); // recupera o elemento do array pelo indice

console.log(numeros.length); // recupera o tamanho do array

nomes.push("Maria"); // adiciona um elemento no final do array
nomes.unshift("Ana"); // adiciona um elemento no inicio do array
console.log(nomes);
const ultimo = nomes.pop(); // remove o ultimo elemento do array
const primeiro = nomes.shift(); // remove o primeiro elemento do array
nomes[2] = "Carlos"; // altera o elemento do array pelo indice

console.log(nomes);

nomes.splice(1, 0, "Pedro"); // exclui ou adiciona elementos em qualquer posição do array
console.log(nomes);

numeros.forEach(function (numero) {
    console.log(numero * 2);
});