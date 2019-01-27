import { Producto } from './producto.model';
export class Talla {
    constructor(
        public nombre:string,
        public cantidad:string,
        public producto?:string
    ){

    }     
}