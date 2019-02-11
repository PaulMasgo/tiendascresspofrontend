import { Usuario } from './usuario.models';
import { Ubigeo } from './ubigeo.model';

export class Direccion {
    constructor(
        public Direccion:string,
        public Tipo:string,
        public Ubigeo:Ubigeo,
        public Usuario:Usuario,
        public Referencia?:string,
    ){

    }     
}