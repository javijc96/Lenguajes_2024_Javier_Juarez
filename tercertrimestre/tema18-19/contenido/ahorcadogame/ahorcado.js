// Espera a que la pagina cargue+
document.addEventListener('DOMContentLoaded', function () {

    const palabras = ['diablo', 'patio', 'feria', 'clase', 'metodo'];
    let palabraAdivinar = [];
    let palabraMostrar = [];
    let fallos = [];
    let intentosRestantes = 5;
    let posicionLetra = document.querySelector('#letra');



    function juego() {
        let palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];;
        palabraAdivinar = palabraAleatoria.split('');
        //saca palabra aleatoria y divide por letras

        for (let letra of palabraAdivinar) {
            palabraMostrar.push('_');
        }//para enseñar los _ en el sitio de rellenar la palabra

        rellenar();//rellena casilla
    }


    let letrasUsadas = document.querySelector('#fallos');
    let intentos = document.querySelector('#intentos');
    let resultado = document.querySelector('#resultado');

    // convierte el array a texto y se enseña en resultado, muestra intentos y los fallos
    function rellenar() {
        resultado.textContent = palabraMostrar.join(' ');
        intentos.textContent = intentosRestantes;
        letrasUsadas.textContent = fallos.join(' ');
    }

    function comprobarLetra() {
        let letraInput = posicionLetra.value;
        posicionLetra.value = '';

        // Recorre la palabra letra a letra
        for (let i = 0; i < palabraAdivinar.length; i++) {
            if (letraInput === palabraAdivinar[i]) {
                palabraMostrar[i] = palabraAdivinar[i];
            }
        }

        if (!palabraAdivinar.includes(letraInput)) {
            intentosRestantes -= 1;
            fallos.push(letraInput);
        }

        fin();
        rellenar();
    }


    //para comprobar si se ha terminado la palabra
    function fin() {
        if (!palabraMostrar.includes('_')) { //gana
            alert('Has descubierto la palabra ' + palabraAdivinar.join(''));
            location.reload(true); //reinicio, recomendacion del bueno de gepeto
        }
        if (intentosRestantes == 0) {//pierde
            alert('Perdiste, la palabra era: ' + palabraAdivinar.join(''));
            location.reload(true);
        }
    }

    //comprobar con enter y con letra, consejo del bueno de gepeto

    let boton = document.querySelector('#boton');
    boton.addEventListener('click', comprobarLetra);
    //ejecuta comprobvar al clicar


    function comprobar(evento) {
        if (evento.code == 'Enter') {
            comprobarLetra();
        }
    }
    posicionLetra.addEventListener('keyup', comprobar);
    //ejecuta comprobar al darle al enter


    juego();
    
});
