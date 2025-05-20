// Importa el módulo 'http' de Node.js
const http = require("http");

// Módulo 'fs' para escribir archivos
const fs = require("fs");

// Módulo 'util' para convertir objetos complejos a texto
const util = require("util");

// Crea el servidor
const servidor = http.createServer((req, res) => {
    // Establece cabeceras de respuesta
    res.writeHead(200, { "Content-Type": "text/plain" });

    // Muestra un mensaje por consola
    console.log("eldiablo");

    // Convierte el objeto 'req' a texto legible
    const contenido = util.inspect(req, { depth: null });

    // Escribe el contenido en un archivo llamado 'registro.txt'
    fs.writeFile("registro.txt", contenido, (err) => {
        if (err) {
            console.error("Error al guardar el archivo:", err);
        } else {
            console.log("Petición guardada en 'registro.txt'");
        }
    });

    // Respuesta al cliente
    res.end("Hola mundo desde el servidor con Node.js");
});

// Puerto donde escucha el servidor
const puerto = 3000;

// Inicia el servidor
servidor.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
