//STOP PROPAGATION
const padre = document.getElementById("padre");
const hijo1 = document.getElementById("hijo1");
const hijo2 = document.getElementById("hijo2");

//Evento en el padre
padre.addEventListener("click", () => {
  console.log("Clic en PADRE");
  alert("Clic recibido en el PADRE");
});

// hijo1 usa stopPropagation → evita que el clic llegue al padre
hijo1.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Clic en HIJO 1 (detenido)");
  alert("Hiciste clic en Hijo 1 (no llega al padre)");
});

// hijo2 no lo usa → el clic se propaga hasta el padre
hijo2.addEventListener("click", () => {
  console.log("Clic en HIJO 2 (se propaga)");
  alert("Hiciste clic en Hijo 2 (el evento sube al padre)");
});


//PREVENT DEFAULT
const toggleBtn = document.getElementById("toggle-enlace");
const enlace = document.getElementById("enlace");

let activo = true; // estado inicial

// Cambia el estado de activación del enlace
toggleBtn.addEventListener("click", () => {
  activo = !activo;
  console.log(`Enlace ${activo ? "activado" : "desactivado"}`);
  alert(`El enlace está ahora ${activo ? "ACTIVO" : "DESACTIVADO"}`);
});

// Cuando se hace clic en el enlace
enlace.addEventListener("click", (e) => {
  if (!activo) {
    e.preventDefault(); // Bloquea el comportamiento por defecto
    console.log("Enlace desactivado. preventDefault() aplicado.");
    alert("Este enlace está desactivado ahora mismo.");
  } else {
    console.log("Enlace activado y funcionando.");
  }
});
