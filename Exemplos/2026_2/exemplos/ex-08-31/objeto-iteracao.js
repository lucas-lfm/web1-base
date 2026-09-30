const carrinho = [
  {
    id: 1,
    produto: "Tênis esportivo",
    preco: 249.90,
    quantidade: 1
  },
  {
    id: 2,
    produto: "Camiseta básica",
    preco: 79.90,
    quantidade: 2
  },
  {
    id: 3,
    produto: "Mochila",
    preco: 159.90,
    quantidade: 1
  },
  {
    id: 4,
    produto: "Fone de ouvido Bluetooth",
    preco: 199.90,
    quantidade: 1
  }
];
const carrinhoComDesc = carrinho.map((item) => {
    const novoItem = {...item, preco: item.preco * 0.9};

    return novoItem;
});
console.table(carrinho);
console.table(carrinhoComDesc);

const carrinhoFiltrado = carrinhoComDesc.filter((item) => item.preco < 160);
console.table(carrinhoFiltrado);

const valorTotal = carrinhoComDesc.reduce((total, item) => total + item.preco * item.quantidade, 0);
console.log(valorTotal);

const carrinhoFiltrado2 = carrinhoComDesc.some((item) => item.preco > 2000);
console.log(carrinhoFiltrado2);