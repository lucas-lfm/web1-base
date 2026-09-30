let carrinho = [
    { id: 1, nome: "Camiseta", preço: 29.99, quantidade: 2 },
    { id: 2, nome: "Calça", preço: 79.99, quantidade: 1 },
    { id: 3, nome: "Tênis", preço: 149.99, quantidade: 1}
];

carrinho.push({ id: 4, nome: "Boné", preço: 19.99, quantidade: 3 });

carrinho.unshift({ id: 5, nome: "Meias", preço: 9.99, quantidade: 5 });

console.log("Carrinho depois:", carrinho);

let ultimoItem = carrinho.pop();
let primeiroItem = carrinho.shift();

console.log("Ultimo item removido:", ultimoItem);
console.log("Primeiro item removido:", primeiroItem);

let total = carrinho.reduce((acumulador, item) => acumulador + (item.preço * item.quantidade), 0);
console.log("Total do carrinho:", total.toFixed(2));