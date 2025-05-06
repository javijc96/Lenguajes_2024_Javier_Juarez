const curro = document.getElementById("curro");
const mensaje = document.getElementById("mensaje");
const destinos = document.querySelectorAll(".destino");

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

        const destinoNombre = destino.getAttribute("data-destino");

        // Mover a curro al centro del destino
        destino.appendChild(curro);

        // Actualizar mensaje
        mensaje.textContent = `Vas a ${destinoNombre}`;
    });
});
