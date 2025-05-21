const colores = ["white", "red", "yellow", "green", "blue"];
const zonaDestino = document.getElementById("zonaDestino");
const tablaResumen = document.querySelector("#tablaResumen tbody");

document.querySelectorAll(".figura").forEach(figura => {
  figura.setAttribute("draggable", "true");

  figura.addEventListener("click", () => cambiarColor(figura));

  figura.addEventListener("dragstart", e => {
    e.dataTransfer.setData("clase", figura.className);
    e.dataTransfer.setData("tipo", figura.dataset.tipo);
    e.dataTransfer.setData("color", figura.classList.contains("triangulo")
      ? figura.style.borderBottomColor
      : figura.style.backgroundColor);
    e.dataTransfer.setData("offsetX", e.offsetX);
    e.dataTransfer.setData("offsetY", e.offsetY);
  });
});

function siguienteColor(actual) {
  const i = colores.indexOf(actual.toLowerCase());
  return colores[(i + 1) % colores.length];
}

function cambiarColor(figura) {
  if (figura.classList.contains("triangulo")) {
    const actual = figura.style.borderBottomColor || "white";
    const siguiente = siguienteColor(actual);
    figura.style.borderBottomColor = siguiente;
  } else {
    const actual = figura.style.backgroundColor || "white";
    const siguiente = siguienteColor(actual);
    figura.style.backgroundColor = siguiente;
  }
  actualizarTabla();
}

zonaDestino.addEventListener("dragover", e => e.preventDefault());

zonaDestino.addEventListener("drop", e => {
  e.preventDefault();

  const clase = e.dataTransfer.getData("clase");
  const tipo = e.dataTransfer.getData("tipo");
  const color = e.dataTransfer.getData("color");

  const nueva = document.createElement("div");
  nueva.className = clase;
  nueva.dataset.tipo = tipo;
  nueva.setAttribute("draggable", "true");

  if (tipo === "triangulo") {
    nueva.style.borderBottomColor = color || "white";
  } else {
    nueva.style.backgroundColor = color || "white";
  }

  nueva.style.position = "absolute";
  const rect = zonaDestino.getBoundingClientRect();
  nueva.style.left = (e.clientX - rect.left - 30) + "px";
  nueva.style.top = (e.clientY - rect.top - 30) + "px";

nueva.addEventListener("click", () => cambiarColor(nueva));

// Eliminar con clic derecho
nueva.addEventListener("contextmenu", e => {
  e.preventDefault(); // Evita que salga el menú del navegador
  nueva.remove();     // Elimina la figura
  actualizarTabla();  // Actualiza la tabla
});
  nueva.addEventListener("dragstart", ev => {
    ev.dataTransfer.setData("clase", nueva.className);
    ev.dataTransfer.setData("tipo", nueva.dataset.tipo);
    ev.dataTransfer.setData("color", nueva.classList.contains("triangulo")
      ? nueva.style.borderBottomColor
      : nueva.style.backgroundColor);
  });

  zonaDestino.appendChild(nueva);
  actualizarTabla();
});

function actualizarTabla() {
  const tipos = ["cuadrado", "circulo", "triangulo"];
  const coloresTabla = ["white", "yellow", "green", "red", "blue"];

  // Inicializar conteo
  const conteo = {};
  tipos.forEach(tipo => {
    conteo[tipo] = {};
    coloresTabla.forEach(color => conteo[tipo][color] = 0);
  });

  // Contar las figuras dentro del área de destino
  const figuras = zonaDestino.querySelectorAll(".figura, .triangulo");
  figuras.forEach(fig => {
    const tipo = fig.dataset.tipo;
    let color = fig.classList.contains("triangulo")
      ? fig.style.borderBottomColor
      : fig.style.backgroundColor;

    color = normalizarColor(color);

    if (conteo[tipo] && conteo[tipo][color] !== undefined) {
      conteo[tipo][color]++;
    }
  });

  // Actualizar las celdas de la tabla (no la reconstruimos)
  const filas = tablaResumen.querySelectorAll("tr");
  filas.forEach(fila => {
    const tipo = fila.dataset.tipo;
    const celdas = fila.querySelectorAll("td");
    coloresTabla.forEach((color, i) => {
      celdas[i + 1].textContent = conteo[tipo][color] || "0";
    });
  });
}

function normalizarColor(color) {
  color = color.toLowerCase();

  if (color.includes("rgb")) {
    if (color.includes("255, 255, 255")) return "white";
    if (color.includes("255, 255, 0")) return "yellow";
    if (color.includes("0, 128, 0") || color.includes("0, 255, 0")) return "green";
    if (color.includes("255, 0, 0")) return "red";
    if (color.includes("0, 0, 255")) return "blue";
  }

  return color;
}

