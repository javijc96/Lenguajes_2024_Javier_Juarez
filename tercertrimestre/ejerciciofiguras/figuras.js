const colores = ["white", "red", "yellow", "green", "blue"];
const zonaDestino = document.getElementById("zonaDestino");
const tablaResumen = document.querySelector("#tablaResumen tbody");

let figuraMoviendose = null; // figura que se está arrastrando con drag & drop
let fueArrastrado = false;   // bandera para evitar clic después de mover

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
    figuraMoviendose = figura;
  });
});

function siguienteColor(actual) {
  const i = colores.indexOf(actual.toLowerCase());
  return colores[(i + 1) % colores.length];
}

function cambiarColor(figura) {
  if (fueArrastrado) return; // evitar cambio de color si fue arrastrado
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

  const rect = zonaDestino.getBoundingClientRect();
  const x = e.clientX - rect.left - 30;
  const y = e.clientY - rect.top - 30;

  // Si estamos moviendo una figura existente
  if (figuraMoviendose && zonaDestino.contains(figuraMoviendose)) {
    figuraMoviendose.style.left = `${x}px`;
    figuraMoviendose.style.top = `${y}px`;
    activarMovimientoDirecto(figuraMoviendose);
    figuraMoviendose = null;
    return;
  }

  // Figura nueva (desde fuera)
  const clase = e.dataTransfer.getData("clase");
  const tipo = e.dataTransfer.getData("tipo");
  const color = e.dataTransfer.getData("color");

  const nueva = document.createElement("div");
  nueva.className = clase;
  nueva.dataset.tipo = tipo;
  nueva.setAttribute("draggable", "true");
  nueva.style.position = "absolute";
  nueva.style.left = `${x}px`;
  nueva.style.top = `${y}px`;

  if (tipo === "triangulo") {
    nueva.style.borderBottomColor = color || "white";
  } else {
    nueva.style.backgroundColor = color || "white";
  }

  nueva.addEventListener("click", () => cambiarColor(nueva));

  nueva.addEventListener("contextmenu", e => {
    e.preventDefault();
    nueva.remove();
    actualizarTabla();
  });

  nueva.addEventListener("dragstart", ev => {
    ev.dataTransfer.setData("clase", nueva.className);
    ev.dataTransfer.setData("tipo", nueva.dataset.tipo);
    ev.dataTransfer.setData("color", nueva.classList.contains("triangulo")
      ? nueva.style.borderBottomColor
      : nueva.style.backgroundColor);
    figuraMoviendose = nueva;
  });

  zonaDestino.appendChild(nueva);
  activarMovimientoDirecto(nueva);
  actualizarTabla();
});

function activarMovimientoDirecto(figura) {
  let offsetX = 0;
  let offsetY = 0;

  const onMouseDown = e => {
    if (e.button !== 0) return; // solo botón izquierdo
    e.preventDefault();
    
    const zonaRect = zonaDestino.getBoundingClientRect();
    offsetX = e.clientX - figura.getBoundingClientRect().left;
    offsetY = e.clientY - figura.getBoundingClientRect().top;
    fueArrastrado = false;

    const onMouseMove = ev => {
      fueArrastrado = true; // al mover activamos la bandera
      let x = ev.clientX - zonaRect.left - offsetX;
      let y = ev.clientY - zonaRect.top - offsetY;

      const maxX = zonaDestino.clientWidth - figura.offsetWidth;
      const maxY = zonaDestino.clientHeight - figura.offsetHeight;

      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      figura.style.left = `${x}px`;
      figura.style.top = `${y}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      figura.style.zIndex = 1;

      // Resetear bandera tras terminar movimiento
      setTimeout(() => { fueArrastrado = false; }, 0);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    figura.style.zIndex = 1000;
  };

  figura.addEventListener("mousedown", onMouseDown);
}

function actualizarTabla() {
  const tipos = ["cuadrado", "circulo", "triangulo"];
  const coloresTabla = ["white", "yellow", "green", "red", "blue"];

  const conteo = {};
  tipos.forEach(tipo => {
    conteo[tipo] = {};
    coloresTabla.forEach(color => conteo[tipo][color] = 0);
  });

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

  const filas = tablaResumen.querySelectorAll("tr");
  filas.forEach(fila => {
    const tipo = fila.dataset.tipo;
    const celdas = fila.querySelectorAll("td");
    const coloresTabla = ["white", "yellow", "green", "red", "blue"];
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
