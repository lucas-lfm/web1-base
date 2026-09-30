let valorHora = Number(prompt("Digite o valor da hora-aula:"));
let horasTrabalhadas = Number(prompt("Digite a quantidade de horas trabalhadas:"));

let salario = valorHora * horasTrabalhadas;

console.log("Salário do professor: R$ " + salario.toFixed(2));