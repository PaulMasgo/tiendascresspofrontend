import { Imagen } from './imagen.model';
import { Producto } from './producto.model';

export class ProductoCarrito {

    constructor(
        public nombre:string,
        public cantidad:number,
        public cantidadDisponible:number,
        public talla:string,
        public precio:number,
        public idproducto:string,
        public imagen:string,
        public producto:Producto,
        public venta?:String

 
    ){
    
    }
}