import http from "node:http";
import { readFile } from "node:fs/promises";

const server = http.createServer(async (req, res) => {
  try {
    const html = await readFile("./exemplo2/index.html");

    res.writeHead(200, {
<<<<<<< HEAD
      "Content-Type": "text/html; charset=utf-8",
=======
      "Content-Type": "text/html; charset=utf-8"
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
    });

    res.end(html);
  } catch (erro) {
    res.writeHead(500, {
<<<<<<< HEAD
      "Content-Type": "text/plain; charset=utf-8",
=======
      "Content-Type": "text/plain; charset=utf-8"
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
    });

    res.end("Erro ao carregar o arquivo HTML.");
  }
});

server.listen(3000, () => {
  console.log("Servidor executando em http://localhost:3000");
<<<<<<< HEAD
});
=======
});
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
