// seleção de elementos do DOM
const imgPreferencia = document.getElementById("imgPreferencia");
const formCadastro = document.getElementById("formCadastro");
const sectionDados = document.getElementById("sectionDados");

function renderizarDados(nome, email, senha, datanascimento, urlImagem) {
    const lista = document.createElement("ul");
    const itemNome = document.createElement("li");
    const itemEmail = document.createElement("li");
    const itemSenha = document.createElement("li");
    const itemDatanascimento = document.createElement("li");
    const itemUrlImagem = document.createElement("li");

    itemNome.textContent = "Nome: " + nome;
    itemEmail.textContent = "Email: " + email;
    itemSenha.textContent = "Senha: " + senha;
    itemDatanascimento.textContent = "Data Nascimento: " + datanascimento;
    itemUrlImagem.textContent = "Url Imagem: " + urlImagem;

    lista.appendChild(itemNome);
    lista.appendChild(itemEmail);
    lista.appendChild(itemSenha);
    lista.appendChild(itemDatanascimento);
    lista.appendChild(itemUrlImagem);

    sectionDados.appendChild(lista);
}
function cadastrarDados(evento) {
    evento.preventDefault(); // previne o carregamento da pagina

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let datanascimento = Number(document.getElementById("datanascimento").value);
    let urlImagem = document.getElementById("urlImagem").value;

    imgPreferencia.src = urlImagem;

    renderizarDados(nome, email, senha, datanascimento, urlImagem);

//    alert("Opa, virus detectado!")
}

formCadastro.addEventListener("submit", cadastrarDados);
