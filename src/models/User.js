export class User {
    constructor({
        nombre,
        apaterno,
        amaterno,
        correo,
        telefono,
        genero,
        usuario,
        password,
        rol = 'usuario',
        bloqueado = false,
        intentos = 0
    }) {
        this.nombre = nombre;
        this.apaterno = apaterno;
        this.amaterno = amaterno;
        this.correo = correo;
        this.telefono = telefono;
        this.genero = genero;
        this.usuario = usuario,
        this.password = password;
        this.rol = rol;

    }
}