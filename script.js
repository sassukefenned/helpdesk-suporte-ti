function adicionarChamado() {
  const input = document.getElementById("chamadoInput");
  const texto = input.value;

  if (texto === "") return;

  const li = document.createElement("li");
  li.textContent = texto + " - Aberto";

  li.onclick = function () {
    if (li.textContent.includes("Aberto")) {
      li.textContent = texto + " - Em andamento";
    } else if (li.textContent.includes("Em andamento")) {
      li.textContent = texto + " - Resolvido";
    }
  };

  document.getElementById("listaChamados").appendChild(li);
  input.value = "";
}