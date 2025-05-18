const curro = document.getElementById("curro");
const mensaje = document.getElementById("mensaje");
const destinos = document.querySelectorAll(".destino");
const volver = document.getElementById("volver");
const zonacurro = document.getElementById("zona-curro");


// Evento: cuando comienza a arrastrarse
curro.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "curro");
});

// Cada destino acepta a curro
destinos.forEach(destino => {
    destino.addEventListener("dragover", (e) => {
        e.preventDefault(); // Necesario para que pueda soltarse
    });

    destino.addEventListener("drop", (e) => {
        e.preventDefault();


        // Mover a curro al centro del destino
        destino.appendChild(curro);
        curro.style.position = "absolute";
        curro.style.top = "50%";
        curro.style.left = "50%";
        curro.style.transform = "translate(-50%, -50%)";

        // Actualizar mensaje
        const destinoNombre = destino.dataset.destino;

        mensaje.textContent = `Vas a ${destinoNombre}`;
    });
});

// Al hacer clic en el botón "Volver al origen"
volver.addEventListener("click", () => {
    // Colocamos el curro de nuevo dentro de su contenedor original
    zonacurro.appendChild(curro);

    // Restauramos la posición original (sin absolute)
    curro.style.position = "relative";
    curro.style.top = "0";
    curro.style.left = "0";
    curro.style.transform = "none";

    // Cambiamos el mensaje a su estado inicial
    mensaje.textContent = "Me voy de vacaciones...";
});
