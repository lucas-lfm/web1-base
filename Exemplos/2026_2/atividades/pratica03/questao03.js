let estoque = [
    { sku: 101, nome: "Teclado", preço: 49.99, qtd: 10 },
    { sku: 102, nome: "Mouse", preço: 29.99, qtd: 15 },
    { sku: 103, nome: "Monitor", preço: 199.99, qtd: 5 },
    { sku: 104, nome: "Gabinete", preço: 89.99, qtd: 7 },
];

let itensCriticos = estoque.filter(item => item.qtd < 10);
console.log("Itens com quantidade crítica (menos de 10):");
console.log(itensCriticos);

function atualizarEstoque(estoque, sku, Qtd) {
    return estoque.map(item => {
        if (item.sku === sku) {
            return { ...item, qtd: item.qtd + Qtd };
        }
        return item;
    });
}

estoque = atualizarEstoque(estoque, 101, -5);
console.log("Estoque atualizado:");
console.log(estoque);