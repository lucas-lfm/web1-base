const campoEntrada = document.getElementById("campoEntrada");
const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");


function novaTarefa() {
  const nomeTarefa = campoEntrada.value.trim();

  if (nomeTarefa === "") {
    campoEntrada.classList.add("input-erro");
    setTimeout(() => campoEntrada.classList.remove("input-erro"), 1500);
    return;
  }

  const itemTarefa = document.createElement("li");
  const span = document.createElement("span");
  const btnExcluir = document.createElement("button");

  span.innerText = nomeTarefa;
  btnExcluir.innerHTML = "<i class='bi bi-trash'></i>";
  btnExcluir.setAttribute("aria-label", "Excluir tarefa");

  span.onclick = (evento) => {
    evento.target.classList.toggle("concluida");
  };

  btnExcluir.onclick = () => {
    listaTarefas.removeChild(itemTarefa);
  };

  itemTarefa.appendChild(span);
  itemTarefa.appendChild(btnExcluir);
  listaTarefas.appendChild(itemTarefa);

  campoEntrada.value = ""; // limpa o campo de entrada
}


formTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  novaTarefa();
});

/* Respostas Questoes:
1. O que precisamos fazer para adicionar um script na seção <head> de uma página HTML e definir que ele só deve ser executado ao finalizar o carregamento da página?
R. Precisamos adicionar o atributo "defer" na tag <script>. Isso garante que o script será executado apenas após o carregamento completo da página.

2. Considere os métodos de seleção de elementos do DOM (Document Object Model) em JavaScript listados abaixo. Relacione cada método à definição correta.
    R. I - B, II - C, III - A.

3. Qual método foi utilizado para adicionar a classe input-erro ao campo de entrada no trecho acima? O que é esse atributo classList?
R. O método utilizado foi classList.add(). O atributo classList é uma propriedade dos elementos do DOM que retorna uma lista de classes CSS do elemento. Ele permite adicionar, remover e alternar classes de forma fácil e eficiente.

4. O que o método createElement() faz e que informação ele precisa receber como argumento?
R. O método createElement() cria um novo elemento HTML no DOM. Ele precisa receber como argumento uma string que representa o nome da tag do elemento que se deseja criar, por exemplo, "div", "span", "li", etc.

5. Em JavaScript, ao manipular elementos do DOM, os atributos innerText e innerHTML são frequentemente utilizados. Qual das alternativas abaixo descreve corretamente a diferença entre esses dois atributos?
R. A alternativa correta é a b — innerText retorna ou define apenas o texto visível ao usuário, enquanto innerHTML retorna ou define o conteúdo HTML do elemento, incluindo tags.

6. O evento de clique foi definido de que forma para os elementos span e btnExcluir (qual atributo foi usado e o que precisamos passar para esse atributo)?
R. Utilizando o atributo onclick. Para o elemento span, passamos uma função que alterna a classe "concluida" no elemento clicado. Para o botão btnExcluir, passamos uma função que remove o item da lista.

7. Os manipuladores dos eventos de clique no botão de adicionar e pressionamento da tecla enter foram definidos de forma diferente agora, usando o método addEventListener(). Explique o funcionamento desse método e o que ele precisa receber como parâmetro.
R. O método addEventListener() permite adicionar um manipulador de eventos a um elemento do DOM. Ele precisa receber dois parâmetros: o tipo de evento que queremos escutar (por exemplo, "click" ou "submit") e a função que será chamada quando o evento ocorrer.
Isso permite uma separação mais clara entre a definição do evento e a lógica que deve ser executada quando o evento é disparado.
*/
