let pedidos = [
    { id: 1, cliente: "Ana", itens: [{ nome: "Camiseta", preço: 29.99, quantidade: 2 }, { nome: "Calça", preço: 79.99, quantidade: 1 }] },
    { id: 2, cliente: "Bruno", itens: [{ nome: "Tênis", preço: 149.99, quantidade: 1 }] }
];

let resumoPedidos = pedidos.map(pedido => {
    let total = pedido.itens.reduce((soma, item) => soma + (item.preço * item.quantidade), 0);
    return { cliente: pedido.cliente, total: total };
});

console.log("Resumo dos pedidos:");
console.log(resumoPedidos);

let pedidosMaiores = resumoPedidos.filter(pedido => pedido.total > 200);

console.log("Pedidos com total maior que 200:");
console.log(pedidosMaiores);

let faturamentoTotal = resumoPedidos.reduce((total, pedido) => total + pedido.total, 0);
console.log("Faturamento total:", faturamentoTotal.toFixed(2));

let quantidadeTotal = pedidos.reduce((totalPedido, pedido) => {
    let quantidadePedido = pedido.itens.reduce((totalItens, item) => totalItem + item.quantidade, 0);
    return totalItens + item.quantidade; }, 0);

console.log("Quantidade total de itens vendidos:", quantidadeTotal);