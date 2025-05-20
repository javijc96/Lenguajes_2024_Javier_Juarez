let precios = {};
let presupuesto = {};
let margen = 0;
let iva = 0;

// Referencias
const listaPrecios = document.getElementById("listaPrecios");
const tablaPresupuesto = document.getElementById("tablaPresupuesto");
const totalBruto = document.getElementById("totalBruto");
const totalConMargen = document.getElementById("totalConMargen");
const totalConIVA = document.getElementById("totalConIVA");
const inputMargen = document.getElementById("margen");
const inputIVA = document.getElementById("iva");

// Iniciar al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("margen")) inputMargen.value = localStorage.getItem("margen");
    if (localStorage.getItem("iva")) inputIVA.value = localStorage.getItem("iva");

    // Recuperar presupuesto almacenado
    const presupuestoGuardado = localStorage.getItem("presupuesto");
    if (presupuestoGuardado) {
        presupuesto = JSON.parse(presupuestoGuardado);
    }

    cargarPrecios();
    configurarPiezas();
});

// Botón: actualizar precios
document.getElementById("actualizarPrecios").addEventListener("click", cargarPrecios);

// Botón: borrar todo
document.getElementById("borrarPresupuesto").addEventListener("click", () => {
    presupuesto = {};
    localStorage.removeItem("presupuesto");
    actualizarTabla();
});

// Drag & drop
document.getElementById("presupuesto").addEventListener("dragover", e => e.preventDefault());
document.getElementById("presupuesto").addEventListener("drop", e => {
    e.preventDefault();
    const color = e.dataTransfer.getData("text/plain");
    agregarPieza(color);
});

// Configurar eventos en imágenes de piezas
function configurarPiezas() {
    document.querySelectorAll(".pieza").forEach(pieza => {
        const color = pieza.dataset.color;

        pieza.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", color);
        });

        pieza.addEventListener("click", () => {
            agregarPieza(color);
        });
    });
}

// Cargar archivo JSON
function cargarPrecios() {
    fetch("precios.json")
        .then(res => res.json())
        .then(data => {
            precios = {};
            listaPrecios.innerHTML = "";

            data.forEach(pieza => {
                precios[pieza.color] = pieza.precio;

                const li = document.createElement("li");

                // Crear imagen
                const img = document.createElement("img");
                img.src = `./imagenes/${pieza.color}.png`;
                img.alt = `pieza ${pieza.color}`;
                img.classList.add("info-img");

                // Crear texto
                const texto = document.createElement("span");
                texto.textContent = `${capitalize(pieza.color)} - €${pieza.precio.toFixed(2)}`;

                // Añadir imagen y texto al elemento de lista
                li.appendChild(img);
                li.appendChild(texto);
                listaPrecios.appendChild(li);
            });

            actualizarTabla();
        });
}

// Añadir pieza al presupuesto
function agregarPieza(color) {
    if (!presupuesto[color]) presupuesto[color] = 0;
    presupuesto[color]++;
    actualizarTabla();
}

// Actualizar tabla
function actualizarTabla() {
    tablaPresupuesto.innerHTML = "";
    let bruto = 0;

    for (const color in presupuesto) {
        const cantidad = presupuesto[color];
        const precioUnitario = precios[color] || 0;
        const total = cantidad * precioUnitario;
        bruto += total;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${capitalize(color)}</td>
            <td>${cantidad}</td>
            <td>€${total.toFixed(2)}</td>
        `;
        tablaPresupuesto.appendChild(fila);
    }

    totalBruto.textContent = `€${bruto.toFixed(2)}`;

    // Validación de margen e IVA
    margen = parseFloat(inputMargen.value);
    iva = parseFloat(inputIVA.value);

    let margenValido = !isNaN(margen) && margen >= 0 && margen <= 100;
    let ivaValido = !isNaN(iva) && iva >= 0 && iva <= 100;

    inputMargen.classList.toggle("input-error", !margenValido);
    inputIVA.classList.toggle("input-error", !ivaValido);

    if (!margenValido || !ivaValido) {
        totalConMargen.textContent = "ERROR";
        totalConIVA.textContent = "ERROR";
        return;
    }

    // Guardar valores válidos en localStorage
    localStorage.setItem("margen", margen);
    localStorage.setItem("iva", iva);
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto)); // Guardar presupuesto

    const conMargen = bruto * (1 + margen / 100);
    const conIVA = conMargen * (1 + iva / 100);

    totalConMargen.textContent = `€${conMargen.toFixed(2)}`;
    totalConIVA.textContent = `€${conIVA.toFixed(2)}`;
}

// Capitalizar
function capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
