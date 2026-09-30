<<<<<<< HEAD
// const notas = [10, 9.2];
const [n1, n2] = [10, 9.2];

console.log(n1);
console.log(n2);

// Desestruturação de objeto
const pessoas = [
  {
    nome: "Lucas",
    idade: 23,
    peso: 78.98765,
  },
  {
    nome: "Vitor",
    idade: 20,
    peso: 84.98765,
  },
];

const idadesAtualizadas = pessoas.map(({ idade }) => ++idade);

const pessoasAtualizadas = pessoas.map((pessoa) => {
  const novaPessoa = { ...pessoa, idade: ++pessoa.idade };
  return novaPessoa;
});

console.log(pessoasAtualizadas);

// const { idade } = pessoa;

console.log(idadesAtualizadas);

let a = 10;
let b = 20;

[a, b] = [b, a];
=======
const notas = [7.7, 9.2];
const [n1, n2] = notas; // destructuring
console.log(n1);
console.log(n2);

//Desestruturação de objetos
const pessoa = [{
  nome: "Matheus",
  idade: 24,
  peso: 78.75175,
},
{
    nome: "Lucas",
    idade: 30,
    peso: 80.5
}];

const idadesAtualizadas = pessoa.map(({ idade }) => ++idade);

//const { idade } = pessoa;

console.log(idadesAtualizadas);
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
