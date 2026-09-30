<<<<<<< HEAD
// Spread Operator - Operador de Espalhamento

const trimestre1 = ["Jan", "Fev", "Mar"];
const trimestre2 = ["Abr", "Mai", "Jun"];

const copiaTrimestre1 = [...trimestre1]; // Cópia de array usando spread
const semestre1 = [...trimestre1, ...trimestre2]; // Junção de arrays
=======
// Spread Operator - operador de espalhamento
const trimestre1 = ["jan", "fev", "mar"];
const trimestre2 = ["abr", "mai", "jun"];

const copiaTrimetre1 = [...trimestre1]; // copia o array usando o spread operator

const semestre1 = [...trimestre1, ...trimestre2]; // junção de arrays usando o spread operator
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45

console.log(semestre1);

const carro = {
<<<<<<< HEAD
  motor: "1.0 Aspirado",
  marca: "Fiat",
  modelo: "Argo",
  ano: 2018,
  km: 80000
}

const copiaCarro = { ...carro, km: 90000 }; // Cópia
=======
    motor: "1.0 Aspirado",
    marca: "Fiat",
    modelo: "Argo",
    ano: 2018,
    km: 80000
}

const copiaCarro = { ...carro, km: 90000 }; // copia
>>>>>>> eb505cdd90c886e33419def8af4b19323f870d45
const anuncio = { ...carro, valor: 52000, local: "Tauá-CE" }