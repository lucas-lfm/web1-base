let peso = Number(prompt("Digite seu peso em kg:"));
let altura = Number(prompt("Digite sua altura em metros:"));

let imc = peso / (altura * altura);

console.log("Seu IMC é: " + imc.toFixed(2));

if (imc < 18.5) {
    console.log("você esta abaixo do peso");
} else if (imc < 25) {
    console.log("você esta com peso normal");
} else if (imc < 30) {
    console.log("voce esta com sobrepeso");
} else {
    console.log("você esta Obeso");
}