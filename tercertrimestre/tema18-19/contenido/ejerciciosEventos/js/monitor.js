const zona = document.getElementById("zonainput");
const lista = document.getElementById("historial");
const limpiarBtn = document.getElementById("limpiar");
const circulo = document.getElementById("circulo");

//Posición inicial del círculo
const posInicial = {
    top: "180px",
    left: "170px"
};

// Función para registrar eventos con hora
function registrar(mensaje) {
    const hora = new Date().toLocaleTimeString();
    const li = document.createElement("li");
    li.textContent = `[${hora}] ${mensaje}`;
    lista.prepend(li); // añade al principio
}

//Eventos del ratón
zona.addEventListener("click", () => registrar("Click detectado"));
zona.addEventListener("dblclick", () => registrar("Doble clic detectado"));
zona.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    registrar("Clic derecho detectado");
});

// Teclado global
document.addEventListener("keydown", (e) => registrar(`Tecla presionada: ${e.key}`));
document.addEventListener("keyup", (e) => registrar(`Tecla soltada: ${e.key}`));

//Eventos del navegador
window.addEventListener("resize", () => registrar("Ventana redimensionada"));
document.addEventListener("visibilitychange", () => {
    registrar(document.hidden ? "Pestaña oculta o minimizada" : "Pestaña visible de nuevo");
});
window.addEventListener("beforeunload", () => {
    registrar("La página se va a cerrar o recargar");
});

//Botón de limpiar
limpiarBtn.addEventListener("click", () => {
    lista.innerHTML = "";
    registrar("Historial limpiado");
});

//Círculo arrastrable
let offsetX, offsetY;

circulo.addEventListener("dragstart", (e) => {
    const rect = circulo.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    registrar("Inicio de arrastre del círculo");
});

//Soltar dentro de la zona
zona.addEventListener("dragover", (e) => e.preventDefault());

zona.addEventListener("drop", (e) => {
    e.preventDefault();
    const zonaRect = zona.getBoundingClientRect();
    const nuevoX = e.clientX - zonaRect.left - offsetX;
    const nuevoY = e.clientY - zonaRect.top - offsetY;

    circulo.style.left = `${nuevoX}px`;
    circulo.style.top = `${nuevoY}px`;

    // Animación visual opcional al soltar dentro
    circulo.classList.add("rebote");
    setTimeout(() => circulo.classList.remove("rebote"), 400);

    registrar(`Círculo soltado en posición (${Math.round(nuevoX)}, ${Math.round(nuevoY)})`);
});

//Soltar fuera de la zona
document.addEventListener("drop", (e) => {
    const estaEnZona = zona.contains(e.target) || zona === e.target;

    if (!estaEnZona) {
        // Volver al origen
        circulo.style.left = posInicial.left;
        circulo.style.top = posInicial.top;

        circulo.classList.add("rebote");
        setTimeout(() => circulo.classList.remove("rebote"), 400);

        registrar("Círculo soltado fuera de la zona (vuelve al origen)");
    }
});
