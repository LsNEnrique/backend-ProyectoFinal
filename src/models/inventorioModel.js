export class Inventario {
    constructor({
        producto,
        tipo,
        precio = 0,
        items = 0,
        dias = 0
    }) {
        this.producto = producto;
        this.tipo = tipo;
    }
}