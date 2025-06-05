export class User {
    constructor({
        nombre,
        correo,
        telefono,
        genero,
        username,
        password,
        bloqueado = false,
        intentos = 0
    }) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.genero = genero;
        this.username = username,
        this.password = password;

    }
}