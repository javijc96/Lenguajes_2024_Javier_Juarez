// Espera a que todo el contenido del DOM esté completamente cargado antes de ejecutar el JS
document.addEventListener('DOMContentLoaded', function () {

    
    // VARIABLES
    

    // Lista de palabras posibles que se pueden adivinar
    const listaPalabras = ['caballo', 'oveja', 'cerdo', 'chimpance'];

    // Array donde se guardará la palabra actual dividida en letras
    let palabraAdivinar = [];

    // Array que se muestra al usuario con guiones (_) y letras acertadas
    let palabraMostrar = [];

    // Array con el historial de letras que ha introducido el usuario y que han fallado
    let historialLetrasUsuario = [];

    // Número máximo de intentos fallidos que el jugador puede tener
    let numIntentos = 5;

    // Captura de nodos del DOM para interactuar con los elementos del HTML
    let nodoLetra = document.querySelector('#letra');         // Input de texto para escribir letras
    let nodoBoton = document.querySelector('#boton');         // Botón de "Comprobar"
    let nodoResultado = document.querySelector('#resultado'); // Div donde se muestra la palabra parcial
    let nodoIntentos = document.querySelector('#intentos');   // Div donde se muestran los intentos restantes
    let nodoHistorial = document.querySelector('#historial'); // Div donde se muestran las letras fallidas

    // FUNCIONES

    /**
     * Prepara el juego para iniciarse con una nueva palabra aleatoria
     */
    function prepararJuego () {
        // 1. Selecciona una posición aleatoria en la lista de palabras
        let posAleatoriaListaPalabras = _.random(listaPalabras.length - 1); // usando Lodash _.random()

        // 2. Obtiene la palabra aleatoria y la divide en letras
        let palabraAleatoria = listaPalabras[posAleatoriaListaPalabras];
        palabraAdivinar = palabraAleatoria.split('');

        // 3. Llena el array visible con guiones bajos (_), uno por cada letra
        for (let letra of palabraAdivinar) {
            palabraMostrar.push('_');
        }

        // 4. Dibuja el estado inicial del juego en pantalla
        dibujarJuego();
    }

    /**
     * Redibuja la interfaz del juego con los datos actuales
     */
    function dibujarJuego () {
        // Muestra la palabra parcial con guiones y letras acertadas
        nodoResultado.textContent = palabraMostrar.join(' ');

        // Muestra los intentos restantes
        nodoIntentos.textContent = numIntentos;

        // Muestra las letras que el usuario ha fallado
        nodoHistorial.textContent = historialLetrasUsuario.join(' ');
    }

    /**
     * Función que se ejecuta cuando el usuario introduce una letra
     */
    function comprobarLetraUsuario () {
        // 1. Obtiene la letra que ha escrito el usuario
        let letraUsuario = nodoLetra.value;

        // 2. Limpia el input y vuelve a darle foco
        nodoLetra.value = '';
        nodoLetra.focus();

        // 3. Recorre la palabra original para ver si la letra está y dónde
        for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
            if (letraUsuario == letraAdivinar) {
                // Si acierta, se sustituye el guion por la letra correspondiente
                palabraMostrar[posicion] = letraAdivinar;
            }
        }

        // 4. Si la letra no estaba en la palabra, se descuenta un intento y se guarda en el historial
        if (!palabraAdivinar.includes(letraUsuario)) {
            numIntentos -= 1;
            historialLetrasUsuario.push(letraUsuario);
        }

        // 5. Comprueba si el juego ha terminado (ganado o perdido)
        acabarJuego();

        // 6. Redibuja la interfaz con los cambios
        dibujarJuego();
    }

    /**
     * Detecta si se ha pulsado la tecla Enter y llama a la función para comprobar la letra
     */
    function comprobarPulsadoEnter (evento) {
        if (evento.code == 'Enter') {
            comprobarLetraUsuario();
        }
    }

    /**
     * Verifica si se ha ganado o perdido y reinicia el juego si es necesario
     */
    function acabarJuego () {
        // Si ya no hay guiones, es que el jugador ha adivinado todas las letras
        if (!palabraMostrar.includes('_')) {
            alert('Has ganado!!!');
            location.reload(true); // Recarga la página para jugar otra vez
        }

        // Si se han agotado los intentos, el jugador pierde
        if (numIntentos == 0) {
            alert('Has Perdido!!! Era: ' + palabraAdivinar.join(''));
            location.reload(true); // Recarga la página para jugar otra vez
        }
    }

    // EVENTOS

    // Al hacer clic en el botón, se comprueba la letra
    nodoBoton.addEventListener('click', comprobarLetraUsuario);

    // Al pulsar Enter en el input, también se comprueba la letra
    nodoLetra.addEventListener('keyup', comprobarPulsadoEnter);

    // INICIO

    // Se inicia el juego automáticamente al cargar la página
    prepararJuego();
});
