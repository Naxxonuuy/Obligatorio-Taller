class Usuarios{
    constructor(usuario,contraseña){
        this.usuario=usuario;
        this.contraseña=contraseña;
    }
}

class Productos{
    constructor(nombre,descripcion,precio,stock){
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.precio=precio;
        this.stock=stock;
    }
}

class Sistema{
    constructor(){
        this.usuarios=[];
        this.productos=[];
    }
    registrarUsuario(usu){
        this.usuarios.push(usu);
    }
    loggearUsuario(usu){
        let permiso = false;
        let usuariolog;
        for(let usua of this.usuarios){
            if(usua.nombre==usu.nombre && usua.contraseña ==usu.contraseña){
                permiso = true;
                usuariolog=usua;
            }else{
                permiso = false
            }
        }
        return permiso
    }
    usuarioActual(usu){
        let usuariolog;
        for(let usua of this.usuarios){
            if(usua.nombre==usu.nombre && usua.contraseña ==usu.contraseña){
                usuariolog=usua;
            }
        }
        return usuariolog;
    }
}