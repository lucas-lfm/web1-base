const cliente = {
    nome: "Matheus",
    sobrenome: "Alves",
    idade: 24,
    nomeCompleto: function() {
        return this.nome + " " + this.sobrenome;
    },
    idadeEscalar: function() {
            this.idade++;
    },
};

console.log(cliente.nomeCompleto());
cliente.idadeEscalar();
console.log("nova idade " + cliente.idade);