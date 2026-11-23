# **Roteiro 02 — Refatoração da API REST com Node.js, Express, Supabase e Prisma ORM 8**

> **Contexto:** neste roteiro, você irá substituir a persistência simulada em arquivo JSON por um banco de dados PostgreSQL hospedado no Supabase. A API continuará utilizando Node.js e Express, mas as operações de consulta e cadastro de produtos passarão a ser realizadas com o Prisma ORM 8.

## **📌 Instruções para Entrega**

- Realize as alterações no repositório do projeto `web1-store`.
- Mantenha a organização do código em módulos: `routes`, `controllers`, `repositories` e `prisma`.
- Não versione o arquivo `.env` nem publique a senha ou a URI de conexão com o banco.
- Utilize commits frequentes e mensagens descritivas, seguindo o padrão Conventional Commits. Exemplos:
  - `✨ feat: configurar conexão com PostgreSQL no Supabase`
  - `♻️ refactor: substituir persistência JSON por Prisma ORM`
  - `🐛 fix: corrigir validação de identificador de produto`
  - `📚 docs: atualizar instruções de configuração do projeto`
- Ao finalizar, atualize o `README.md` com as instruções para instalar, configurar, executar e testar a API.
- Preserve os endpoints já implementados e o formato das respostas HTTP, sempre que possível.

## **Pré-requisitos**

- Node.js 24.11 ou superior.
- `npm` disponível no terminal.
- Projeto `web1-store` configurado com Node.js e Express.
- Conta no [Supabase](https://supabase.com/?utm_source=chatgpt.com).
- Banco de dados PostgreSQL criado no Supabase.
- Editor de código (VS Code recomendado).
- Cliente HTTP para testes, como Postman.

## **Estrutura atual do projeto**

O projeto já possui a seguinte organização:

```
web1-store/
├── src/
│   ├── controllers/
│   │   └── produtoController.js
│   ├── database/
│   │   └── db.json
│   ├── repositories/
│   │   └── produtoRepository.js
│   └── routes/
│       └── produtoRoutes.js
├── app.js
└── package.json
```

Atualmente, o módulo `produtoRepository.js` utiliza `readFile()` e `writeFile()` para consultar e atualizar os dados armazenados em `db.json`.

Ao final desta atividade, o repositório deverá utilizar o Prisma ORM para acessar o PostgreSQL no Supabase.

## **1️⃣ Etapa 1: Criando o banco de dados no Supabase**

> **🎯 Objetivo:**
>
> - Criar um banco de dados PostgreSQL na nuvem e obter os dados necessários para estabelecer a conexão com a aplicação Node.js.

### **1. Criando o projeto**

1. Acesse o [Supabase](https://supabase.com/?utm_source=chatgpt.com).
2. Faça login ou crie uma conta.
3. Crie um novo projeto.
4. Informe um nome para o projeto.
5. Defina uma senha segura para o banco de dados.
6. Selecione uma região e aguarde a criação do projeto.

### **2. Obtendo a URI de conexão**

Após a criação do projeto:

1. Acesse o painel do projeto.
2. Clique em **Connect**.
3. Localize as opções de conexão PostgreSQL.
4. Copie a URI de conexão disponibilizada pelo Supabase.

A URI terá um formato semelhante a este:

```
postgresql://usuario:senha@host:5432/postgres?sslmode=require
```

> **📌 Atenção:**
>
> - Utilize a URI fornecida pelo próprio Supabase.
> - Não compartilhe a senha do banco de dados.
> - Para aplicações executadas em ambientes que não suportam IPv6, verifique a disponibilidade do Session Pooler.
> - A URI de conexão será armazenada em uma variável de ambiente, e não diretamente no código-fonte.

## **2️⃣ Etapa 2: Inicializando o Prisma ORM 8**

> **🎯 Objetivo:**
>
> - Integrar o Prisma ORM ao projeto existente utilizando a ferramenta de inicialização automatizada.
> - Gerar a estrutura necessária para modelar os dados e estabelecer a conexão com o PostgreSQL.

> O Prisma ORM é uma biblioteca que facilita o acesso a bancos de dados relacionais, como PostgreSQL, MySQL e SQLite. Ele fornece um cliente gerado automaticamente com base em um contrato de dados definido pelo desenvolvedor. Com essa abordagem, é possível realizar operações de consulta, inserção, atualização e exclusão de registros de forma facilitada e segura.

### **1. Instalando as dependências**

Antes de inicializar o Prisma, certifique-se de que as dependências necessárias estejam instaladas:

```bash
npm install @prisma/orm-postgres pg
```

***Dependências de desenvolvimento:***

```bash
npm install -D prisma @types/pg @types/node tsx typescript
```

### **2. Inicializando o Prisma**

Na raiz do projeto `web1-store`, execute:

```bash
npx prisma@latest orm init --yes --target postgres --authoring psl
```

Esse comando automatiza a configuração inicial do Prisma, instala as dependências necessárias faltantes e cria os arquivos de configuração e acesso ao banco de dados.

Entre os arquivos gerados, você encontrará:

```
web1-store/
├── src/
│   └── prisma/
│       ├── contract.prisma
│       └── db.ts
├── prisma.config.ts
├── tsconfig.json
└── package.json
```

Após a emissão do contrato, também serão gerados:

```
src/prisma/
├── contract.json
└── contract.d.ts
```

### **3. Configurando a conexão com o banco**

Abra o arquivo `.env`, localizado na raiz do projeto.

Adicione a variável `DATABASE_URL`, utilizando a URI obtida no Supabase:

```
DATABASE_URL="postgresql://usuario:senha@host:5432/postgres?sslmode=require"
PORT=3000
```

Substitua os valores de exemplo pelos dados reais de conexão.

Confira também o arquivo `.gitignore`:

```
node_modules/
.env
```

Crie ou mantenha o arquivo `.env.example` com as variáveis necessárias, sem incluir credenciais:

```
DATABASE_URL=""
PORT=3000
```

> **📌 Por que isso é importante?**
>
> As informações de conexão são sensíveis. Utilizar variáveis de ambiente evita expor credenciais no código-fonte e no repositório GitHub.

## **3️⃣ Etapa 3: Modelando os dados com Prisma**

> **🎯 Objetivo:**
>
> - Definir a estrutura da entidade Produto no contrato do Prisma.
> - Representar os campos que serão armazenados na tabela PostgreSQL.

### **1. Criando o modelo Produto**

Abra o arquivo:

```
src/prisma/contract.prisma
```

Substitua o modelo inicial pelo seguinte conteúdo:

```
// use prisma-8

model Produto {
  id        Int                  @id @default(autoincrement())
  nome      String
  preco     NumericString(10, 2)
  categoria String
  createdAt DateTime             @default(now())
  updatedAt temporal.UpdatedAt

  @@map("produtos")
}
```

> **📌 Explicação do modelo:**
>
> - `id`: identificador único do produto, gerado automaticamente.
> - `nome`: nome do produto.
> - `preco`: valor monetário com precisão de duas casas decimais.
> - `categoria`: categoria à qual o produto pertence.
> - `createdAt`: data e hora da criação do registro.
> - `updatedAt`: data e hora da última atualização.
> - `@@map("produtos")`: define `produtos` como nome da tabela no PostgreSQL.

**Atenção aos tipos utilizados:**

- `NumericString(10, 2)` representa valores decimais com precisão e escala definidas, disponibilizando o valor como string na aplicação.
- `temporal.UpdatedAt` substitui o atributo `@updatedAt` da sintaxe tradicional do Prisma.

### **2. Emitindo o contrato**

Após definir o modelo, execute:

```
npx prisma contract emit
```

Esse comando gera os arquivos necessários para que o runtime do Prisma utilize o contrato definido:

```
src/prisma/
├── contract.prisma
├── contract.json
├── contract.d.ts
└── db.ts
```

> **📌 Importante:**
>
> Os arquivos `contract.json` e `contract.d.ts` são gerados automaticamente. Não edite esses arquivos manualmente. Sempre que alterar o contrato, execute novamente `npx prisma contract emit`.

## **4️⃣ Etapa 4: Criando a tabela no PostgreSQL**

> **🎯 Objetivo:**
>
> - Planejar e aplicar a primeira migração do contrato Prisma no banco Supabase.
> - Criar a tabela `produtos` no PostgreSQL.

### **1. Planejando a migração**

Com o contrato emitido, execute:

```
npx prisma migration plan --name init
```

O Prisma irá comparar o contrato definido com o estado registrado do banco e produzir um plano de migração.

### **2. Revisando a migração**

Verifique os arquivos gerados na pasta `migrations/`.

Analise o conteúdo da migração e confirme se a operação corresponde à criação da tabela `produtos`, com os campos definidos no contrato.

### **3. Aplicando a migração**

Depois de revisar o plano, execute:

```
npx prisma db migrate
```

O comando aplica a migração ao banco PostgreSQL e registra o estado correspondente.

### **4. Verificando o banco**

Execute:

```
npx prisma db verify
```

Verifique se a estrutura do banco corresponde ao contrato definido no projeto.

> **📌 Atenção:**
>
> Este procedimento considera um banco Supabase recém-criado e vazio. Não aplique uma migração inicial às cegas em um banco que já possua tabelas ou dados. Nesse caso, é necessário verificar e reconciliar o estado existente antes de registrar novas migrações.
>
> Utilize o fluxo `migration plan` e `db migrate` para manter o histórico de alterações do banco.

## **5️⃣ Etapa 5: Utilizando o cliente Prisma gerado**

> **🎯 Objetivo:**
>
> - Reutilizar a conexão criada automaticamente pelo Prisma.
> - Disponibilizar o acesso ao PostgreSQL para os módulos da aplicação.

### **1. Conhecendo o arquivo db.ts**

O comando `orm init` criou o arquivo:

```
src/prisma/db.ts
```

Esse módulo inicializa o runtime PostgreSQL utilizando o contrato emitido e a variável `DATABASE_URL`.

Não é necessário criar outro arquivo de conexão.

Nos demais módulos da aplicação, importe o objeto `db` disponibilizado pelo arquivo:

```
import { db } from "../prisma/db.ts";
```

O caminho acima será utilizado no repositório de produtos, localizado em `src/repositories`.

> **📌 Observação:**
>
> Mantenha a configuração do cliente gerado pelo Prisma. Não recrie a conexão a cada requisição HTTP. A aplicação deve reutilizar a mesma instância do cliente.

## **6️⃣ Etapa 6: Refatorando o Produto Repository**

> **🎯 Objetivo:**
>
> - Substituir o acesso ao arquivo JSON por operações no PostgreSQL.
> - Manter o repositório como responsável pelo acesso e manipulação dos dados.

### **1. Analisando a implementação atual**

Atualmente, o arquivo `produtoRepository.js` utiliza os módulos:

```
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
```

Esses módulos são utilizados para localizar, ler e atualizar o arquivo `db.json`.

Com a utilização do Supabase, essas operações deixam de ser necessárias.

### **2. Substituindo o código do repositório**

Abra:

```
src/repositories/produtoRepository.js
```

Substitua o conteúdo pelo seguinte código:

```
import { db } from "../prisma/db.ts";

async function buscarTodosProdutos() {
  return await db.orm.public.Produto.all();
}

async function buscarPorId(id) {
  return await db.orm.public.Produto
    .whereUnique({ id })
    .first();
}

async function cadastrarProduto(dadosProduto) {
  return await db.orm.public.Produto.create({
    nome: dadosProduto.nome,
    preco: Number(dadosProduto.preco).toFixed(2),
    categoria: dadosProduto.categoria,
  });
}

export {
  buscarTodosProdutos,
  buscarPorId,
  cadastrarProduto,
};
```

### **3. Entendendo as alterações**

| Implementação anterior | Nova implementação                   |
| ---------------------- | ------------------------------------ |
| `readFile()`           | `Produto.all()`                      |
| `JSON.parse()`         | Não é mais necessário                |
| `Array.find()`         | `whereUnique().first()`              |
| `push()`               | `Produto.create()`                   |
| `writeFile()`          | Persistência realizada no PostgreSQL |

> **📌 Explicação do código:**
>
> - `buscarTodosProdutos()`: consulta todos os registros da tabela `produtos`.
> - `buscarPorId(id)`: procura um produto utilizando seu identificador único.
> - `cadastrarProduto(dadosProduto)`: insere um novo produto no banco de dados.
>
> Observe que o repositório não precisa mais controlar a geração dos identificadores. O PostgreSQL será responsável por gerar o ID automaticamente.

## **7️⃣ Etapa 7: Refatorando o Produto Controller**

> **🎯 Objetivo:**
>
> - Adaptar as funções do controller para trabalhar com os dados retornados pelo PostgreSQL.
> - Preservar as validações e os códigos de resposta HTTP da API.

### **1. Ajustando a listagem de produtos**

A função `buscarProdutos()` continuará chamando o repositório, mas agora receberá os dados do Supabase.

### **2. Ajustando a busca por identificador**

A função `buscarProdutoPorId()` deverá validar o identificador antes de consultar o banco.

Também será necessário interromper a execução após retornar um erro, evitando que o Express tente enviar mais de uma resposta para a mesma requisição.

### **3. Ajustando o cadastro**

A função `salvarProduto()` continuará recebendo os dados pelo corpo da requisição e validando os campos obrigatórios.

A diferença é que o produto será persistido no PostgreSQL por meio do repositório.

### **4. Código atualizado do controller**

Abra:

```
src/controllers/produtoController.js
```

Substitua o conteúdo pelo seguinte:

```
import {
  buscarTodosProdutos,
  buscarPorId,
  cadastrarProduto,
} from "../repositories/produtoRepository.js";

function formatarProduto(produto) {
  if (!produto) return produto;

  return {
    ...produto,
    preco: Number(produto.preco),
  };
}

async function buscarProdutos(req, res) {
  const produtos = await buscarTodosProdutos();

  return res.json(produtos.map(formatarProduto));
}

async function buscarProdutoPorId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      erro: "ID inválido.",
    });
  }

  const produto = await buscarPorId(id);

  if (!produto) {
    return res.status(404).json({
      erro: "Produto não encontrado.",
    });
  }

  return res.json(formatarProduto(produto));
}

async function salvarProduto(req, res) {
  const { nome, preco, categoria } = req.body;

  if (
    typeof nome !== "string" ||
    nome.trim() === "" ||
    typeof preco !== "number" ||
    !Number.isFinite(preco) ||
    preco < 0 ||
    typeof categoria !== "string" ||
    categoria.trim() === ""
  ) {
    return res.status(422).json({
      erro: "Dados inválidos!",
    });
  }

  const dadosProduto = {
    nome: nome.trim(),
    preco,
    categoria: categoria.trim(),
  };

  const produtoCriado = await cadastrarProduto(dadosProduto);

  return res.status(201).json(formatarProduto(produtoCriado));
}

export {
  buscarProdutos,
  buscarProdutoPorId,
  salvarProduto,
};
```

> **📌 Por que utilizar a função&#x20;**`formatarProduto()`**?**
>
> O tipo `NumericString` representa o preço como string na aplicação. A função converte esse valor para número ao construir a resposta JSON, mantendo o formato que a API já utilizava.
>
> Para operações financeiras que exigem precisão decimal, evite realizar cálculos diretamente com números de ponto flutuante.

## **8️⃣ Etapa 8: Revisando as rotas e o servidor**

> **🎯 Objetivo:**
>
> - Garantir que os endpoints existentes continuem funcionando após a substituição da camada de persistência.

### **1. Verificando as rotas**

O arquivo `produtoRoutes.js` não precisa de alterações na estrutura, pois continua direcionando as requisições para as mesmas funções do controller.

Confira seu conteúdo:

```
import { Router } from "express";

import {
  buscarProdutos,
  buscarProdutoPorId,
  salvarProduto,
} from "../controllers/produtoController.js";

const router = Router();

router.get("/", buscarProdutos);
router.get("/:id", buscarProdutoPorId);
router.post("/", salvarProduto);

export default router;
```

### **2. Verificando o app.js**

O arquivo `app.js` também pode manter sua estrutura atual:

```
import express from "express";
import "dotenv/config";

import produtosRouter from "./src/routes/produtoRoutes.js";

const PORTA = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/produtos", produtosRouter);

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
```

> **📌 Explicação:**
>
> A arquitetura da aplicação permanece a mesma:
>
> - `routes`: recebe e direciona as requisições.
> - `controllers`: valida os dados e controla as respostas HTTP.
> - `repositories`: executa as operações de acesso aos dados.
> - `prisma`: disponibiliza a conexão e a estrutura de dados para o PostgreSQL.
>
> A principal mudança está na implementação do repositório, que deixa de manipular arquivos e passa a utilizar o banco de dados.

## **9️⃣ Etapa 9: Importando os produtos do arquivo JSON**

> **🎯 Objetivo:**
>
> - Transferir os produtos já existentes em `db.json` para a tabela `produtos` no Supabase.
> - Utilizar um script independente da API para realizar a importação inicial.

### **1. Criando o script de importação**

Crie o arquivo:

```
src/importarProdutos.js
```

Adicione o seguinte código:

```
import { readFile } from "node:fs/promises";

import { db } from "./prisma/db.ts";

async function main() {
  const conteudo = await readFile(
    new URL("./database/db.json", import.meta.url),
    "utf-8"
  );

  const produtos = JSON.parse(conteudo);

  for (const produto of produtos) {
    await db.orm.public.Produto.create({
      nome: produto.nome,
      preco: Number(produto.preco).toFixed(2),
      categoria: produto.categoria,
    });
  }

  console.log(`${produtos.length} produtos importados.`);
}

try {
  await main();
} catch (erro) {
  console.error("Erro ao importar produtos:", erro);
  process.exitCode = 1;
} finally {
  await db.close();
}
```

### **2. Executando a importação**

Na raiz do projeto, execute:

```
node src/importarProdutos.js
```

Se a operação for concluída, você deverá visualizar uma mensagem semelhante a:

```
4 produtos importados.
```

### **3. Conferindo os dados no Supabase**

1. Acesse o painel do Supabase.
2. Abra o **Table Editor**.
3. Localize a tabela `produtos`.
4. Verifique se os quatro produtos foram cadastrados.

> **📌 Atenção:**
>
> - O PostgreSQL irá gerar novos identificadores para os produtos.
> - O script deve ser executado somente uma vez para evitar duplicações.
> - Não remova o arquivo `db.json` antes de confirmar que todos os dados foram importados corretamente.
> - Depois da importação, o arquivo JSON não deverá mais ser utilizado pela API em tempo de execução.

## **🔟 Etapa 10: Atualizando os scripts do projeto**

> **🎯 Objetivo:**
>
> - Facilitar a execução dos comandos de emissão do contrato, migração, importação e inicialização da API.

Abra o arquivo `package.json` e preserve os scripts existentes. Acrescente os seguintes comandos:

```
{
  "scripts": {
    "dev": "nodemon ./app.js",
    "start": "node ./app.js",
    "contract:emit": "prisma contract emit",
    "migration:plan": "prisma migration plan",
    "db:migrate": "prisma db migrate",
    "db:verify": "prisma db verify",
    "import:json": "node src/importarProdutos.js"
  }
}
```

A partir de agora, você poderá executar os comandos utilizando `npm`:

**Emitir o contrato:**

```
npm run contract:emit
```

**Planejar uma migração:**

```
npm run migration:plan -- --name init
```

**Aplicar a migração:**

```
npm run db:migrate
```

**Verificar o banco:**

```
npm run db:verify
```

**Importar os produtos do JSON:**

```
npm run import:json
```

**Iniciar a API:**

```
npm run dev
```

> **📌 Importante:**
>
> Quando o modelo de dados for alterado no futuro, será necessário emitir novamente o contrato, planejar uma nova migração, revisar as operações e aplicá-la ao banco.
>
> Não execute novamente a migração inicial depois de ela já ter sido aplicada.

## **1️⃣1️⃣ Etapa 11: Testando a API**

> **🎯 Objetivo:**
>
> - Verificar se os endpoints estão consultando e persistindo os dados no PostgreSQL hospedado no Supabase.
> - Confirmar que a API continua respondendo corretamente às requisições HTTP.

### **1. Iniciando o servidor**

Execute:

```
npm run dev
```

### **2. Listando os produtos**

Faça uma requisição:

```
GET http://localhost:3000/produtos
```

A resposta deverá conter os produtos importados do banco de dados.

### **3. Buscando um produto pelo ID**

Faça uma requisição:

```
GET http://localhost:3000/produtos/1
```

A API deverá retornar o produto correspondente, caso exista.

Teste também um identificador inválido:

```
GET http://localhost:3000/produtos/abc
```

Resposta esperada:

```
{
  "erro": "ID inválido."
}
```

### **4. Cadastrando um novo produto**

Faça uma requisição:

```
POST http://localhost:3000/produtos
Content-Type: application/json
```

Corpo da requisição:

```
{
  "nome": "Teclado Mecânico",
  "preco": 249.90,
  "categoria": "Informática"
}
```

Resposta esperada:

```
{
  "id": 5,
  "nome": "Teclado Mecânico",
  "preco": 249.9,
  "categoria": "Informática",
  "createdAt": "2026-11-23T...",
  "updatedAt": "2026-11-23T..."
}
```

O identificador e as datas serão gerados automaticamente. O valor exato das datas dependerá do momento da execução.

### **5. Verificando a persistência**

Depois de cadastrar o produto:

1. Acesse o Table Editor do Supabase.
2. Abra a tabela `produtos`.
3. Verifique se o novo registro foi armazenado.
4. Reinicie a API.
5. Faça novamente uma requisição GET para `/produtos`.

O produto deverá continuar disponível, pois os dados agora estão armazenados no PostgreSQL, e não mais no arquivo JSON.

## **Estrutura Final do Projeto**

Após concluir a refatoração, a organização deverá ser semelhante a esta:

```
web1-store/
├── src/
│   ├── controllers/
│   │   └── produtoController.js
│   │
│   ├── database/
│   │   └── db.json
│   │
│   ├── repositories/
│   │   └── produtoRepository.js
│   │
│   ├── routes/
│   │   └── produtoRoutes.js
│   │
│   ├── prisma/
│   │   ├── contract.prisma
│   │   ├── contract.json
│   │   ├── contract.d.ts
│   │   └── db.ts
│   │
│   └── importarProdutos.js
│
├── migrations/
│   ├── app/
│   └── snapshots/
│
├── .env
├── .env.example
├── .gitignore
├── prisma.config.ts
├── tsconfig.json
├── app.js
├── package.json
└── package-lock.json
```

## **Próximas Etapas**

Após concluir a migração, a API estará preparada para evoluir com novas operações.

- Implementar o endpoint de atualização de produtos (`PUT` e `PATCH`).
- Implementar o endpoint de exclusão de produtos (`DELETE`).
- Implementar filtros e busca de produtos por categoria e nome.
- Adicionar tratamento centralizado de erros.
- Implementar validações mais robustas.
- Criar testes automatizados para os endpoints.
- Documentar a API utilizando OpenAPI/Swagger.

**Tabela de Endpoints:**

| Método   | Rota                      | Descrição                          | Status de sucesso |
| -------- | ------------------------- | ---------------------------------- | ----------------- |
| `GET`    | `/produtos`               | Lista todos os produtos ✅          | `200`             |
| `GET`    | `/produtos/:id`           | Retorna um produto pelo ID ✅       | `200`             |
| `POST`   | `/produtos`               | Cadastra um novo produto ✅         | `201`             |
| `PUT`    | `/produtos/:id`           | Substitui completamente um produto | `200`             |
| `PATCH`  | `/produtos/:id`           | Atualiza campos específicos        | `200`             |
| `DELETE` | `/produtos/:id`           | Remove um produto                  | `204`             |
| `GET`    | `/produtos?categoria=...` | Filtra produtos por categoria      | `200`             |
| `GET`    | `/produtos?busca=...`     | Busca produtos por nome            | `200`             |

## **📚 Referências**

- [Documentação do Node.js](https://nodejs.org/docs/latest/api/?utm_source=chatgpt.com)
- [Documentação do Express](https://expressjs.com/?utm_source=chatgpt.com)
- [Documentação do Supabase](https://supabase.com/docs?utm_source=chatgpt.com)
- [Documentação do Prisma ORM](https://www.prisma.io/docs?utm_source=chatgpt.com)
- [Prisma ORM — Inicialização do projeto](https://www.prisma.io/docs/cli/orm-init?utm_source=chatgpt.com)
- [Prisma ORM — Migrações](https://www.prisma.io/docs/orm/migrations?utm_source=chatgpt.com)
- [PostgreSQL — Documentação oficial](https://www.postgresql.org/docs/?utm_source=chatgpt.com)