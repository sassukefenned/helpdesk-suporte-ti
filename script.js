if (localStorage.getItem("logado") !== "true") {
  window.location.href = "login.html";
}
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
function filtrarChamados(filtro) {
  const lista = document.getElementById("listaChamados");
  lista.innerHTML = "";

  let filtrados = chamados;

  if (filtro !== "todos") {
    filtrados = chamados.filter(c => c.status === filtro);
  }

  filtrados.forEach((chamado, index) => {
    const li = document.createElement("li");
    li.innerText = chamado.texto + " - " + chamado.status;
    lista.appendChild(li);
  });
}
function mostrarPagina(pagina) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pagina).classList.remove("hidden");

  if (pagina === "dashboard") atualizarDashboard();
}

function atualizarDashboard() {
  document.getElementById("total").innerText =
    "Total: " + chamados.length;

  document.getElementById("abertos").innerText =
    "Abertos: " + chamados.filter(c => c.status === "aberto").length;

  document.getElementById("resolvidos").innerText =
    "Resolvidos: " + chamados.filter(c => c.status === "resolvido").length;
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
}