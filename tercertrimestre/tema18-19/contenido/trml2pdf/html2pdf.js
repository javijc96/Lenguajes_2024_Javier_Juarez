tinymce.init({
    selector: '#editorTexto',  
    language: 'es',           
    height: 300,              
    menubar: false // Oculta menus
});


function pasarADiv() {
    const contenido = tinymce.get("editorTexto").getContent(); // recibe HTML del editor
    document.getElementById("salida").innerHTML = contenido; // contenido aparece en id "salida"
}

function generarPDF() {
    const elemento = document.getElementById("salida");  
    html2pdf().from(elemento).save("documento.pdf"); 
}