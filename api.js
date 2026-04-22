function getChamados() {
  return JSON.parse(localStorage.getItem("chamados")) || [];
}

function salvarChamados(chamados) {
  localStorage.setItem("chamados", JSON.stringify(chamados));
}