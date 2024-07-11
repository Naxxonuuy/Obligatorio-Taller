window.addEventListener("load", inicio);

class Usuarios {
    constructor(usuario, contraseña) {
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

class Productos {
    constructor(nombre, descripcion, precio, stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }
}

class Sistema {
    constructor() {
        this.usuarios = [];
        this.productos = [];
    }

    registrarUsuario(usuario) {
        this.usuarios.push(usuario);
    }

    loggearUsuario(usuario) {
        return this.usuarios.some(u => u.usuario === usuario.usuario && u.contraseña === usuario.contraseña);
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    obtenerProductos() {
        return this.productos;
    }
}

let sistema = new Sistema();
let usuarioLogeado = null;

function inicio() {
    mostrarAutentificacion();
    document.getElementById("idBotonIniciarSesion").addEventListener("click", mostrarAutentificacion);
    document.getElementById("idBotonRegistrarse").addEventListener("click", mostrarRegistrar);
    document.getElementById("idBotonProductos").addEventListener("click", mostrarProductos);
    document.getElementById("idBotonCerrarSesion").addEventListener("click", cerrarSesion);

    document.getElementById("formIniciarSesion").addEventListener("submit", function(event) {
        event.preventDefault();
        iniciarSesion();
    });

    document.getElementById("formRegistrarUsuario").addEventListener("submit", function(event) {
        event.preventDefault();
        registrarUsuario();
    });

    document.getElementById("idAgregarProducto").addEventListener("click", agregarProducto);
}

function mostrarId(id) {
    document.getElementById(id).style.display = "block";
}

function ocultarId(id) {
    document.getElementById(id).style.display = "none";
}

function mostrarAutentificacion() {
    ocultarId("idRegistrar");
    ocultarId("idProductos");
    mostrarId("idAutentificacion");
}

function mostrarRegistrar() {
    ocultarId("idAutentificacion");
    ocultarId("idProductos");
    mostrarId("idRegistrar");
}

function iniciarSesion() {
    const usuario = document.getElementById("idUsuario").value;
    const contraseña = document.getElementById("idContraseña").value;
    const usu = new Usuarios(usuario, contraseña);

    if (sistema.loggearUsuario(usu)) {
        usuarioLogeado = usu;
        alert("Inicio de sesión exitoso.");
        mostrarId("idBotonProductos");
        mostrarId("idBotonCerrarSesion");
        ocultarId("idBotonIniciarSesion");
        ocultarId("idBotonRegistrarse");
        mostrarProductos();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function registrarUsuario() {
    const usuario = document.getElementById("idUsuarioReg").value;
    const contraseña = document.getElementById("idContraseñaReg").value;
    const nuevoUsuario = new Usuarios(usuario, contraseña);
    sistema.registrarUsuario(nuevoUsuario);
    alert("Usuario registrado exitosamente.");
    mostrarAutentificacion();
}

function cerrarSesion() {
    usuarioLogeado = null;
    ocultarId("idBotonProductos");
    ocultarId("idBotonCerrarSesion");
    mostrarId("idBotonIniciarSesion");
    mostrarId("idBotonRegistrarse");
    mostrarAutentificacion();
}

