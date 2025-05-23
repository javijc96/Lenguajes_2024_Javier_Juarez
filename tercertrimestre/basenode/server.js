const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Definir la ruta base de los archivos
    let filePath = '';

    // Elegimos el archivo según la ruta
    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'index.html');
            break;
        case '/archivo1':
            filePath = path.join(__dirname, 'archivo1.html');
            break;
        case '/archivo2':
            filePath = path.join(__dirname, 'archivo2.html');
            break;
        default:
            // Si la ruta no coincide, mostramos error 404
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 No encontrado');
            return;
    }

    // Leemos el archivo HTML solicitado
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Si hay error leyendo el archivo, enviamos error 500
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error interno del servidor');
        } else {
            // Si todo va bien, enviamos el archivo con el content-type adecuado
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}/`);
});
