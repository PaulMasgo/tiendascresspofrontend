import { Producto } from './producto.model';

export class Favorito {
    constructor(
        public producto:Producto,
        public usuario:string,
        public _id?:string
    ){

    }     
}