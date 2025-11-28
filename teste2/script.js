const livros = [
  { titulo: "O Senhor dos Anéis",  capa: "https://covers.openlibrary.org/b/id/8231996-L.jpg" },
  { titulo: "1984", capa: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
  { titulo: "Dom Casmurro",  capa: "https://covers.openlibrary.org/b/id/8101345-L.jpg" },
  { titulo: "Breves Respostas às Grandes Questões", capa: "https://covers.openlibrary.org/b/id/10521235-L.jpg" },
  { titulo: "O Pequeno Príncipe",  capa: "https://covers.openlibrary.org/b/id/10958315-L.jpg" },
];

const gridLivros = document.querySelector(".grid-livros");
livros.forEach(livro => {
  const card = document.createElement("div");
  card.classList.add("livro");
  card.innerHTML = `
    <img src="${livro.capa}" alt="${livro.titulo}">
    <h5>${livro.titulo}</h5>
    <p>${livro.autor}</p>
  `;
  gridLivros.appendChild(card);
});

const inputPesquisa = document.getElementById("pesquisa");
inputPesquisa.addEventListener("input", () => {
  const termo = inputPesquisa.value.toLowerCase();
  document.querySelectorAll(".livro").forEach(card => {
    const titulo = card.querySelector("h5").textContent.toLowerCase();
    card.style.display = titulo.includes(termo) ? "block" : "none";
  });
});

const menuN = document.getElementsByClassName("menuN")[0],
      menuD = document.getElementsByClassName("menuD")[0];
menuN.onclick = function(){
    menuD.classList.remove("remove")
}

menuD.onmouseout = function(){
   menuD.classList.add("remove")
}
