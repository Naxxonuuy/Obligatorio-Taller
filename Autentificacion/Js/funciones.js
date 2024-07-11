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

function mostrarProductos() {
    if (usuarioLogeado) {
        ocultarId("idAutentificacion");
        ocultarId("idRegistrar");
        mostrarId("idProductos");
        mostrarProductosDisponibles();
    } else {
        alert("Debe iniciar sesión primero.");
        mostrarAutentificacion();
    }
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

function agregarProducto() {
    const nombre = document.getElementById("idNombreProducto").value;
    const descripcion = document.getElementById("idDescripcionProducto").value;
    const precio = document.getElementById("idPrecioProducto").value;
    const stock = document.getElementById("idStockProducto").value;

    if (nombre && descripcion && precio && stock) {
        const producto = new Productos(nombre, descripcion, precio, stock);
        sistema.agregarProducto(producto);
        mostrarProductosDisponibles();
    }
}

function mostrarProductosDisponibles() {
    const listaProductos = document.getElementById("idListaProductos");
    if (!listaProductos) {
        console.error("Elemento idListaProductos no encontrado.");
        return;
    }
    listaProductos.innerHTML = "";

    const productos = sistema.obtenerProductos();
    productos.forEach(prod => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <h2>${prod.nombre}</h2>
            <p>${prod.descripcion}</p>
            <p>Precio: $${prod.precio}</p>
            <p>Stock: ${prod.stock}</p>
            <button onclick="comprarProducto('${prod.nombre}')">Comprar</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

function comprarProducto(nombreProducto) {
    const productos = sistema.obtenerProductos();
    const producto = productos.find(prod => prod.nombre === nombreProducto);

    if (producto && producto.stock > 0) {
        producto.stock -= 1;
        alert(`Has comprado ${nombreProducto}`);
        mostrarProductosDisponibles();
    } else {
        alert("Producto no disponible");
    }
}

// Ejemplo de agregar usuarios y productos predefinidos para pruebas
sistema.registrarUsuario(new Usuarios("Admin", "Admin"));
sistema.agregarProducto(new Productos("Producto 1", "Descripción del producto 1", 100, 10));
sistema.agregarProducto(new Productos("Producto 2", "Descripción del producto 2", 200, 5));
mostrarProductosDisponibles();
