export class User {
    constructor({
        nombre,
        correo,
        telefono,
        genero,
        usuario,
        password,
        bloqueado = false,
        intentos = 0
    }) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.genero = genero;
        this.usuario = usuario,
        this.password = password;

    }
}