import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Direccion } from '../models/direccion.model';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private hhto:HttpClient) { }

  agregar(direccion:Direccion){
    let url = URL_SERVICIOS + '/direccion';
    return this.hhto.post(url,direccion);
  }

  verdireccion(id){
    let url = URL_SERVICIOS + '/direccion/una/' + id;
    return this.hhto.get(url);
  }

  obtenerdirecciones(usuario){
    let url = URL_SERVICIOS + '/direccion/'+usuario
    return this.hhto.get(url);
  } 

  actualizarDireccion(direccion:Direccion,id){
    let url = URL_SERVICIOS + '/direccion/' + id;
    return this.hhto.put(url,direccion);
  }

  eliminarDireccion(id){
    let url = URL_SERVICIOS + '/direccion/' + id;
    return this.hhto.delete(url);
  }

  

}
