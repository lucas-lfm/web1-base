import http from "node:http";

const produtos = [
  {
    id: 1,
    nome: "Teclado",
<<<<<<< HEAD
    preco: 100,
=======
    preco: 100
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
  },
  {
    id: 2,
    nome: "Mouse",
<<<<<<< HEAD
    preco: 50,
  },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/produtos") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
=======
    preco: 50
  }
];

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/produtos") {

    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8"
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
    });

    res.end(JSON.stringify(produtos));

    return;
  }

  res.writeHead(404, {
<<<<<<< HEAD
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(
    JSON.stringify({
      erro: "Recurso não encontrado",
    }),
  );
=======
    "Content-Type": "application/json; charset=utf-8"
  });

  res.end(JSON.stringify({
    erro: "Recurso não encontrado"
  }));
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
});

server.listen(3000, () => {
  console.log("API executando em http://localhost:3000");
<<<<<<< HEAD
});
=======
});
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
