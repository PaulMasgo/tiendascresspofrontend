import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(public http:HttpClient) { }

  listarCategorias(){
    let url = URL_SERVICIOS + '/categoria'
    return this.http.get(url);
  }
}
