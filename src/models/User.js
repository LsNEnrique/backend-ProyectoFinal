export class User {
    constructor({
        nombre,
        correo,
        username,
        password,
        shopName = null,
        shopAddress = null,
        bloqueado = false,
        intentos = 0
    }) {
        this.nombre = nombre;
        this.correo = correo;
        this.username = username;
        this.password = password;
        this.shopName = shopName;
        this.shopAddress = shopAddress;

    }
}