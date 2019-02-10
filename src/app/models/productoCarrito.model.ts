import { Imagen } from './imagen.model';

export class ProductoCarrito {

    constructor(
        public nombre:string,
        public cantidad:number,
        public cantidadDisponible:number,
        public talla:string,
        public precio:number,
        public idProducto:string,
        public imagen:string,
    ){
    
    }
}