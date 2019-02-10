import { Imagen } from './imagen.model';
import { Categoria } from './categoria.model';

export class Producto {

    constructor(
        public nombre:string,
        public descripcion:string,
        public precio:number,
        public categoria:Categoria,
        public _id?:string,
        public estado?:boolean,
        public imagen?:Imagen,
        public color?:string
    ){
    
    }
}