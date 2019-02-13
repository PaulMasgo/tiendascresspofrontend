import { Usuario } from './usuario.models';

export class Venta {
    constructor(
        public Fecha:String,
        public usuario:Usuario,
        public boleta?:String,
        public codigo?:String,
        public descuento?:Number
    ){

    }     
}