import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

  constructor(private http:HttpClient) { }

  listar(prodducto:string){
    let url = URL_SERVICIOS +'/talla/' + prodducto;
    return this.http.get(url); 
  }

  actualizarCantidad(id,cantidad){
    let url = URL_SERVICIOS + '/talla/cantidad/' + id;
    return this.http.put(url,{cantidad:cantidad});
  }
}
