import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http:HttpClient) { }
    
  UsuarioActivo:Usuario;
  
    login(usuario:Usuario){
      let url = URL_SERVICIOS + '/login'
      return this.http.post(url,usuario); 
   }  

   registrar(usuario:Usuario){
     let url = URL_SERVICIOS + '/usuario'
    return this.http.post(url,usuario); 
   }

   verificar(id:string,codigo:string){
    let url = URL_SERVICIOS + '/usuario/verificar/' + id;
    return this.http.put(url,{codigoRegistro:codigo}); 
   }

   loginGoogle(token:string){
    let url = URL_SERVICIOS + '/login/google' ;
    return this.http.post(url,{token:token});
   }

   actualizar(usuario:Usuario,id){
      let url = URL_SERVICIOS + '/usuario/'+id;
      return  this.http.put(url,usuario);
   }

}
