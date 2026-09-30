let n1 = Number(prompt("Digite a nota da N1:"));
let n2 = Number(prompt("Digite a nota da N2:"));

let notaFinal = (n1 * 2 + n2 * 3) / 5;

console.log("Nota final: " + notaFinal.toFixed(1));

if (notaFinal >= 6.0) {
    console.log("Aluno aprovado!");
} else {
    console.log("Aluno reprovado!");
}