
// QUESTÃO 2 - BOLETIM DE NOTAS



// Array de objetos com os DADOS DOS ALUNOS

let alunos = [
    { nome: "Ana", notas: [8.5, 9] },
    { nome: "Carlos", notas: [5, 6.7] },
    { nome: "João", notas: [10, 8] },
    { nome: "Maria", notas: [2.3, 3] }
];


// UM NOVO ARRAY COM NOME E MÉDIA
// Usando MAP + REDUCE

let alunosComMedia = alunos.map(aluno => {

    // REDUCE: soma das duas notas do aluno
    let soma = aluno.notas.reduce((total, nota) => {
        return total + nota;
    }, 0);

    // Calculo média das 2 notas
    let media = soma / 2;

    //retorna novo array com o nome e a média do aluno
    return {
        nome: aluno.nome,
        media: media
    };
});


// Mostra o resultado
console.log("ALUNOS COM MÉDIA");
console.table(alunosComMedia);


// B) FILTRO DOS ALUNOS COM MÉDIA MAIOR QUE7

let acimaDe7 = alunosComMedia.filter(aluno => {
    return aluno.media > 7;
});


// Mostra os alunos media maior que 7
console.log("ALUNOS COM MÉDIA MAIOR QUE 7");
console.table(acimaDe7);


// FILTRO DOS ALUNOS COM MÉDIA MENOR QUE 3

let abaixoDe3 = alunosComMedia.filter(aluno => {
    return aluno.media < 3;
});


// Mostra alunos media menor q 3
console.log("ALUNOS COM MÉDIA MENOR QUE 3");
console.table(abaixoDe3);