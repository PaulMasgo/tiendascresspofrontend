import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http:HttpClient) { }
    
  UsuarioActivo:Usuario;
  
    login(usuario:Usuario){
      let url = 'http://localhost:3000' + '/login'
      return this.http.post(url,usuario); 
   }  

   registrar(usuario:Usuario){
     let url = 'http://localhost:3000' + '/usuario'
    return this.http.post(url,usuario); 
   }

}
