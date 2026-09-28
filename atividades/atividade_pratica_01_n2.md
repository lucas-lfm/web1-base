<table style="width: 100%; margin: 0 auto;">
    <tr>
        <td rowspan="2"><img src="./logo_taua_simples.png" style="width: 200px; margin: 0 auto"></td>
        <td colspan="2" align="center"><b>INSTITUTO FEDERAL DO CEARÁ - CAMPUS TAUÁ<br>
                        TÉCNICO SUBSEQUENTE EM INFORMÁTICA PARA INTERNET</b>
        </td>
    </tr>
    <tr>
        <td><b>Professor:</b> Me. Lucas Mendes</td>
        <td><b>Disciplina:</b> Desenvolvimento Web I<br>
            <b>Turma:</b> S2
        </td>
    </tr>
    <tr>
        <td colspan="3" align="center"><strong>Atividade Prática 01 da N2: Implementação de Servidores com Node.js</strong></td>
    </tr>
</table>

---

### Objetivos

Ao final da atividade, o estudante deverá ser capaz de:

* criar servidores HTTP utilizando Node.js;
* trabalhar com diferentes tipos de conteúdo na resposta;
* utilizar métodos HTTP e rotas;
* retornar HTML diretamente pelo servidor;
* retornar arquivos HTML estáticos;
* utilizar templates EJS para gerar HTML dinamicamente;
* retornar dados no formato JSON;
* manipular dados utilizando recursos da linguagem JavaScript.

---

### Instruções

* Leia atentamente cada questão;
* Implemente as soluções conforme solicitado;
* Teste cada rota utilizando o navegador ou ferramentas como Postman ou Insomnia;
* Atualize o repositório no GitHub com o código desenvolvido, gerando um novo commit para cada questão resolvida;
* Ao final, envie o link do repositório pelo classroom.

---

# Questão 1. Painel de produtos

O sistema de uma pequena loja virtual mantém seus produtos em um array de objetos, conforme demonstrado abaixo:

```js
const produtos = [
    {
        id: 1,
        nome: "Teclado Mecânico",
        categoria: "Periféricos",
        preco: 250
    },
    {
        id: 2,
        nome: "Mouse Gamer",
        categoria: "Periféricos",
        preco: 150
    },
    {
        id: 3,
        nome: "Monitor 24",
        categoria: "Monitores",
        preco: 900
    }
];
```

Implemente um servidor Node.js que responda à rota:

```text
GET /produtos
```

A resposta deve ser uma página HTML construída **diretamente no servidor**, utilizando **template literals**.

A página deverá apresentar:

* título "Produtos";
* quantidade total de produtos;
* uma lista contendo nome, categoria e preço de cada produto;
* o preço formatado como valor monetário;
* um destaque para produtos com preço superior a R$ 500.

**Requisitos:**

* utilizar `map()` ou outro método de iteração;
* utilizar template literals;
* definir o `Content-Type` adequadamente;
* retornar status HTTP `200`.

---

# Questão 2. Página institucional estática

Uma empresa chamada **RetroTech** deseja disponibilizar uma página institucional.

Crie um arquivo:

```text
index.html
```

contendo:

* nome da empresa;
* descrição;
* três serviços;
* informações de contato;
* uma seção "Sobre nós".

Em seguida, implemente um servidor Node.js que responda:

```text
GET /
```

retornando o conteúdo do arquivo `index.html`.

### Desafio adicional

Crie uma segunda rota:

```text
GET /contato
```

que retorne outro arquivo HTML.

O servidor deverá identificar a rota solicitada e entregar o arquivo correspondente.

**Requisitos:**

1. utilizar `fs/promises`;
2. utilizar `async/await`;
3. enviar o arquivo somente após sua leitura;
4. informar ao cliente que o conteúdo retornado é HTML, definindo o `Content-Type` adequadamente;
5. retornar `500` caso ocorra erro na leitura do arquivo.

---

# Questão 3. Catálogo de jogos com EJS

Uma loja especializada em videogames retrô possui o seguinte catálogo:

```js
const jogos = [
    {
        id: 1,
        titulo: "Super Metroid",
        plataforma: "SNES",
        preco: 180
    },
    {
        id: 2,
        titulo: "Chrono Trigger",
        plataforma: "SNES",
        preco: 250
    },
    {
        id: 3,
        titulo: "God of War II",
        plataforma: "PS2",
        preco: 120
    },
    {
        id: 4,
        titulo: "The Legend of Zelda",
        plataforma: "NES",
        preco: 200
    }
];
```

Utilizando **EJS**, crie um template:

```text
views/jogos.ejs
```

e uma rota:

```text
GET /jogos
```

que gere dinamicamente uma página HTML contendo o catálogo.

A página deverá apresentar:

* uma lista de jogos com: título do jogo, plataforma, preço;
* quantidade total de jogos;
* preço médio dos jogos;
* indicação de quais jogos custam menos de R$ 200 (pode ser uma seção extra abaixo da listagem principal).

O servidor deve enviar os dados para o template em vez de construir toda a página utilizando template literals.

### Requisitos

Utilize pelo menos:

* `map()` ou `forEach()`;
* `filter()`;
* `reduce()`;
* interpolação EJS com `<%= %>`.

---

# Questão 4. API de produtos

A mesma aplicação precisa disponibilizar seus produtos para outros sistemas, por meio de uma API.

Implemente uma API REST com a seguinte rota:

```text
GET /api/produtos
```

A resposta deve ser um JSON contendo todos os produtos.

Exemplo:

```json
[
    {
        "id": 1,
        "nome": "Teclado Mecânico",
        "categoria": "Periféricos",
        "preco": 250
    },
    {
        "id": 2,
        "nome": "Mouse Gamer",
        "categoria": "Periféricos",
        "preco": 150
    },
    {
        "id": 3,
        "nome": "Monitor 24",
        "categoria": "Monitores",
        "preco": 900
    }
]
```

Depois, implemente também:

```text
GET /api/produtos/:id
```

para retornar um produto específico.

Por exemplo:

```text
GET /api/produtos/2
```

deve retornar:

```json
{
    "id": 2,
    "nome": "Mouse Gamer",
    "categoria": "Periféricos",
    "preco": 150
}
```

Caso o produto não exista, a API deverá retornar:

```json
{
    "erro": "Produto não encontrado"
}
```

com status HTTP:

```text
404
```

### Requisitos

Utilize:

* `JSON.stringify()`;
* `find()`;
* `split()` ou outra estratégia para interpretar a URL;
* método HTTP;
* código de status HTTP;
* `Content-Type: application/json`.

---

# Questão 5. Dashboard de vendas

Uma empresa deseja disponibilizar um pequeno dashboard de vendas.

Considere:

```js
const vendas = [
    {
        id: 1,
        vendedor: "Ana",
        produto: "Teclado",
        quantidade: 2,
        valorUnitario: 200
    },
    {
        id: 2,
        vendedor: "Carlos",
        produto: "Mouse",
        quantidade: 5,
        valorUnitario: 80
    },
    {
        id: 3,
        vendedor: "Ana",
        produto: "Monitor",
        quantidade: 1,
        valorUnitario: 900
    },
    {
        id: 4,
        vendedor: "Carlos",
        produto: "Teclado",
        quantidade: 3,
        valorUnitario: 200
    }
];
```

Implemente duas rotas:

```text
GET /dashboard
GET /api/vendas
```

### `/dashboard`

Deve retornar uma página HTML utilizando **EJS**.

O dashboard deverá apresentar:

* quantidade de vendas;
* quantidade total de produtos vendidos;
* valor total vendido;
* venda de maior valor;
* vendedor com maior volume de vendas;
* uma tabela com todas as vendas.

Para calcular o valor de cada venda:

```text
quantidade × valorUnitario
```

---

### `/api/vendas`

Deve retornar os dados em formato JSON.

Exemplo:

```json
{
    "totalVendas": 4,
    "totalItens": 11,
    "faturamento": 2500
}
```

Além disso, a API deverá disponibilizar:

```text
GET /api/vendas?vendedor=Ana
```

retornando somente as vendas daquele vendedor.

### Requisitos

Nesta questão, o aluno deverá utilizar:

* `filter()`;
* `map()`;
* `reduce()`;
* `find()`;
* destructuring;
* spread operator;
* template EJS;
* JSON;
* query string;
* códigos de status HTTP.

---