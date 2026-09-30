import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Servidor Node.js</title>
      </head>
      <body>
        <h1>Olá, mundo!</h1>
        <p>Este HTML foi gerado diretamente pelo servidor.</p>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log("Servidor executando em http://localhost:3000");
<<<<<<< HEAD
});
=======
});
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
