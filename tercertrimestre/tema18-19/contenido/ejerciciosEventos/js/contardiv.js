const divs = document.querySelectorAll(".zona-divs div");

//Contadores
let total = divs.length;
let conContenido = 0;
let vacios = 0;

// Recorrer div y comprobar contenido
divs.forEach(div => {
  // Eliminamos espacios y saltos de línea
  const contenido = div.innerHTML.trim();

  if (contenido === "") {
    vacios++;
  } else {
    conContenido++;
  }
});

// Resultados
document.getElementById("total").textContent = `Total de divs: ${total}`;
document.getElementById("con-contenido").textContent = `Con contenido: ${conContenido}`;
document.getElementById("vacios").textContent = `Vacíos: ${vacios}`;
