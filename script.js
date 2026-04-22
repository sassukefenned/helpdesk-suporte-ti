const input = document.getElementById("chamadoInput");
const lista = document.getElementById("listaChamados");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

function salvar() {
  localStorage.setItem("chamados", JSON.stringify(chamados));
}

function renderizar() {
  lista.innerHTML = "";

  chamados.forEach((chamado, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${chamado.texto}</span>
      <strong class="${chamado.status}">${chamado.status}</strong>
      <button onclick="mudarStatus(${index})">Atualizar</button>
      <button onclick="removerChamado(${index})">Remover</button>
    `;

    lista.appendChild(li);
  });
}

function adicionarChamado() {
  if (input.value === "") return;

  chamados.push({
    texto: input.value,
    status: "aberto"
  });

  input.value = "";
  salvar();
  renderizar();
}

function mudarStatus(index) {
  const statusAtual = chamados[index].status;

  if (statusAtual === "aberto") chamados[index].status = "andamento";
  else if (statusAtual === "andamento") chamados[index].status = "resolvido";

  salvar();
  renderizar();
}

function removerChamado(index) {
  chamados.splice(index, 1);
  salvar();
  renderizar();
}

renderizar();