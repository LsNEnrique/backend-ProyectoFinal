export class Inventario {
    constructor({
        nombre,
        producto,
        tipo,
        precio = 0,
        items = 0,
        dias = 0
    }) {
        this.nombre = nombre;
        this.producto = producto;
        this.tipo = tipo;
    }
}