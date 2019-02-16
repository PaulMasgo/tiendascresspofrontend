import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';
import { Ubigeo } from '../models/ubigeo.model';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http:HttpClient) { }

  registrar(ubigeo:Ubigeo){
    let url = URL_SERVICIOS + '/ubigeo';
    return this.http.post(url,ubigeo);
  }

  actualizar(ubigeo:Ubigeo,id){
    let url = URL_SERVICIOS + '/ubigeo/' +id;
    return this.http.put(url,ubigeo)
  }
  
  eliminar(id){
    let url = URL_SERVICIOS + '/ubigeo/' +id;
    return this.http.delete(url)
  }


}
