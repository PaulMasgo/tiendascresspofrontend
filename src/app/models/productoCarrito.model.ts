import { Imagen } from './imagen.model';
import { Producto } from './producto.model';
import { Talla } from './talla.models';

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
        public venta?:String,
        public tallaE?:Talla
 
    ){
    
    }
}