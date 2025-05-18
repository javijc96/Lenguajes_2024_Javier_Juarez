function calcular() {
    // tamaños
    const ancho = parseFloat(document.getElementById("ancho").value); // Ancho
    const alto = parseFloat(document.getElementById("alto").value); // Alto
    const profundidad = parseFloat(document.getElementById("profundidad").value); // Profundidad
    const material = document.getElementById("material").value; // Material 
  
    // material
    const precioBase = parseFloat(document.getElementById("precioBase").value); // Precio base por m³
    const incPlastico = parseFloat(document.getElementById("incPlastico").value); // plástico
    const incCarton = parseFloat(document.getElementById("incCarton").value); // cartón
    const incMadera = parseFloat(document.getElementById("incMadera").value); // madera
    const iva = parseFloat(document.getElementById("iva").value); // IVA

    const resultado = document.getElementById("resultado"); 

    const dimensiones = [ancho, alto, profundidad];

    // checkear dimensiones malas
    if (dimensiones.some(d => d < 5 || d > 100)) {
      resultado.innerHTML = "Las dimensiones deben estar entre 5 cm y 100 cm.";
      return;
    }
  
    // checkear relacion a 5
    const max = Math.max(...dimensiones);
    const min = Math.min(...dimensiones);
    if (max / min > 5) {
      resultado.innerHTML = "No se permite que una dimensión supere en más de 5 veces a otra.";
      return;
    }

  
    const volumen = (ancho * alto * profundidad) / 1000; //litros
    const superficie = ancho * alto; // superficie  
  
    let incremento = 0;
  
    // Asignar el porcentaje de incremento según el material seleccionado
    switch (material) {
      case "plastico":
        incremento = incPlastico;
        break;
      case "carton":
        incremento = incCarton;
        break;
      case "madera":
        incremento = incMadera;
        break;
    }
  
    // Calcular el precio sin IVA:
    // volumen en m³ * precio base * (1 + incremento en %)
    const precioSinIVA = (volumen / 1000) * precioBase * (1 + incremento / 100);
  
    // Calcular precio final con IVA
    const precioConIVA = precioSinIVA * (1 + iva / 100);
  
    // -------------------------------
    // MOSTRAR RESULTADO
    // -------------------------------
    resultado.innerHTML = `
      Dimensiones de la caja: ${ancho} x ${alto} x ${profundidad} cm<br>
      Volumen en cm³: ${(ancho * alto * profundidad).toFixed(2)}<br>
      Superficie en cm²: ${superficie.toFixed(2)}<br>
      Material seleccionado: ${material.charAt(0).toUpperCase() + material.slice(1)}<br>
      Precio sin IVA: ${precioSinIVA.toFixed(2)} €<br>
      Precio con IVA: ${precioConIVA.toFixed(2)} €
    `;
  }