export class Cliente {
    constructor({
        nombre,
        direccion,
        telefono,
        ciudad,
        estado
    }) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.estado = estado;
    }
}