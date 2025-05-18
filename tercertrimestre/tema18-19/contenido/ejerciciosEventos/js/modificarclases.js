//Referencia al div que vamos a modificar
const tarjeta = document.getElementById("tarjeta");

//Botones
const btnColor = document.getElementById("color");
const btnPunteado = document.getElementById("punteado");
const btnRedondeado = document.getElementById("redondeado");
const btnOcultar = document.getElementById("ocultar");
const btnMostrar = document.getElementById("mostrar");
const btnGrande = document.getElementById("grande");
const btnChico = document.getElementById("chico");

//Color de fondo
btnColor.addEventListener("click", () => {
  tarjeta.classList.toggle("color-fondo");
});

//Bordes punteados
btnPunteado.addEventListener("click", () => {
  tarjeta.classList.toggle("bordes-punteados");
});

//Bordes redondeados
btnRedondeado.addEventListener("click", () => {
  tarjeta.classList.toggle("bordes-redondeados");
});

//Ocultar
btnOcultar.addEventListener("click", () => {
  tarjeta.classList.add("oculto");
});

//Mostrar
btnMostrar.addEventListener("click", () => {
  tarjeta.classList.remove("oculto");
});

// Tamaño grande
btnGrande.addEventListener("click", () => {
  tarjeta.classList.add("grande");
  tarjeta.classList.remove("chico");
});

//Tamaño chico
btnChico.addEventListener("click", () => {
  tarjeta.classList.add("chico");
  tarjeta.classList.remove("grande");
});
