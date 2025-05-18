function procesarCadena() {
  const texto = document.getElementById("texto").value;
  const resultado = document.getElementById("resultado");

  // Limpieza de espacios
  const limpio = texto.trim();

  // Operaciones
  const longitud = limpio.length;
  const palabras = limpio === "" ? 0 : limpio.split(/\s+/).length;
  const mayusculas = limpio.toUpperCase();
  const minusculas = limpio.toLowerCase();
  const capitalizado = limpio.split(" ")
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" ");
  const primerCaracter = limpio.charAt(0);
  const ultimoCaracter = limpio.charAt(limpio.length - 1);
  const contieneA = limpio.includes("a") ? "Sí" : "No";
  const reemplazo = limpio.replace(/a/g, "@");
  const subcadena = limpio.substring(0, 5);
  const concatenado = limpio.concat(" JS");

  // Mostrar resultados
  resultado.innerHTML = `
    <p><strong>Texto original:</strong> ${limpio}</p>
    <p><strong>Longitud:</strong> ${longitud}</p>
    <p><strong>Número de palabras:</strong> ${palabras}</p>
    <p><strong>Mayúsculas:</strong> ${mayusculas}</p>
    <p><strong>Minúsculas:</strong> ${minusculas}</p>
    <p><strong>Capitalizado:</strong> ${capitalizado}</p>
    <p><strong>Primer carácter:</strong> ${primerCaracter}</p>
    <p><strong>Último carácter:</strong> ${ultimoCaracter}</p>
    <p><strong>Concatenado con " JS":</strong> ${concatenado}</p>
    <p><strong>Contiene "a":</strong> ${contieneA}</p>
    <p><strong>Reemplazar "a" por "@":</strong> ${reemplazo}</p>
    <p><strong>Subcadena (0-5):</strong> ${subcadena}</p>
  `;
}
