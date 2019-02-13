import { Producto } from './producto.model';

export class Detalle {
    constructor(
        public venta:String,
        public precio:Number,
        public cantidad:Number,
        public producto:Producto,
        public talla:String
    ){

    }     
}