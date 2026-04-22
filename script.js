if (!window.location.pathname.includes("login.html")) {
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  const input = document.getElementById("chamadoInput");
  const lista = document.getElementById("listaChamados");

  let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

  function salvar() {
    localStorage.setItem("chamados", JSON.stringify(chamados));
  }

  function renderizar(listaFiltrada = chamados) {
    if (!lista) return;

    lista.innerHTML = "";

    listaFiltrada.forEach((chamado, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${chamado.texto} - <span class="${chamado.status}">${chamado.status}</span>
        <button onclick="mudarStatus(${index})">Atualizar</button>
        <button onclick="removerChamado(${index})">Remover</button>
      `;

      lista.appendChild(li);
    });
  }

  window.adicionarChamado = function () {
    if (!input || input.value === "") return;

    chamados.push({ texto: input.value, status: "aberto" });

    input.value = "";
    salvar();
    renderizar();
  };

  window.mudarStatus = function (index) {
    const s = chamados[index].status;

    if (s === "aberto") chamados[index].status = "andamento";
    else if (s === "andamento") chamados[index].status = "resolvido";

    salvar();
    renderizar();
  };

  window.removerChamado = function (index) {
    chamados.splice(index, 1);
    salvar();
    renderizar();
  };

  window.filtrarChamados = function (filtro) {
    if (filtro === "todos") renderizar();
    else renderizar(chamados.filter(c => c.status === filtro));
  };

  window.mostrarPagina = function (pagina) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(pagina).classList.remove("hidden");

    if (pagina === "dashboard") atualizarDashboard();
  };

  window.atualizarDashboard = function () {
    document.getElementById("total").innerText = "Total: " + chamados.length;
    document.getElementById("abertos").innerText =
      "Abertos: " + chamados.filter(c => c.status === "aberto").length;
    document.getElementById("resolvidos").innerText =
      "Resolvidos: " + chamados.filter(c => c.status === "resolvido").length;
  };

  window.logout = function () {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
  };

  renderizar();
});

function toggleTheme() {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}