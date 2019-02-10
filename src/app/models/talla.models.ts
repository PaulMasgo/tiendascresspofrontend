import { Producto } from './producto.model';
export class Talla {
    constructor(
        public nombre:string,
        public cantidad:number,
        public producto:string,
        public _id?:string
    ){

    }     
}