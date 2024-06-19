window.addEventListener("load",inicio);

function inicio(){
    mostrarAutentificacion();
    document.getElementById("idBotonIniciarSesion").addEventListener("click",mostrarAutentificacion);
    document.getElementById("idBotonRegistrarse").addEventListener("click",mostrarRegistrar);
}


function mostrarId(id){
    document.getElementById(id).style.display="block";
}

function ocultarId(id){
    document.getElementById(id).style.display="none";
}

function mostrarAutentificacion() {
    ocultarId("idRegistrar")
    mostrarId("idAutentificacion")
}

function mostrarRegistrar() {
    ocultarId("idAutentificacion")
    mostrarId("idRegistrar")
}


