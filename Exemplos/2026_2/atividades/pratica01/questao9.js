let valor1 = Number(prompt("Digite o primeiro valor:"));
let valor2 = Number(prompt("Digite o segundo valor:"));

console.log("Números ímpares entre os valores:");

for (let i = valor1; i <= valor2; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}