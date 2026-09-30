const prompt = require("prompt-sync")(); // importa a lib prompt sync

const produto = {
  id: 1,
  titulo: "Notebook Dell Inspiron",
  descricao: "Notebook com processador Intel Core i5, 16 GB de RAM e SSD de 512 GB.",
  preco: 3499.90,
  estoque: 25,
  atualizarEstoque: function (qtd) {
    this.estoque += qtd;
  },
    aplicarDesconto: function (taxaDesconto) {
        this.preco -= (this.preco * taxaDesconto) / 100;
    },
};

const quantidade = parseInt(prompt("Digite a quantidade de produtos a ser adicionada ao estoque: "));
const taxaDesconto = Number(prompt("Digite a taxa de desconto a ser aplicado em %: "));

produto.atualizarEstoque(quantidade);
produto.aplicarDesconto(taxaDesconto);

console.table(produto);