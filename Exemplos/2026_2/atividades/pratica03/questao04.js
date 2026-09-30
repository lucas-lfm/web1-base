let produtos = [
    { id: 1, nome: "Teclado", preco: 49.99, categoria: "Periféricos" },
    { id: 3, nome: "Monitor", preco: 199.99, categoria: "Monitores" },
    { id: 4, nome: "Gabinete", preco: 89.99, categoria: "Componentes" }
];

let produtosComDesconto = produtos.map(produto => {
    let precoComDesconto = produto.preco * 0.9; // 10% de desconto
    return {
        ...produto,
        precoComDesconto: precoComDesconto
    };
});

console.log("Produtos com desconto:");
console.log(produtosComDesconto);

let perifericos = produtos.filter(produto => produto.categoria === "Periféricos");
console.log("Produtos da categoria 'Periféricos':");
console.log(perifericos);

let totalProdutos = produtos.reduce((total, produto) => total + produto.preco, 0);
console.log("Total do preço de todos os produtos:", totalProdutos);

let pecoMedio = produtos.reduce((total, produto) => total + produto.preco, 0) / produtos.length;
console.log("Preço médio dos produtos:", pecoMedio.toFixed(2));