
export class Usuario {
    constructor(
       public  nombre :string,
       public correo:string,
       public password?:string,
       public telefono?:string,
       public imagen?:string,
       public google?:string,
       public tipo?:string,
       public estado?:string,
       public _id?:string
    ){ }   
}