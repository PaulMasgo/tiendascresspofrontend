import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public http:HttpClient) { }

  buscarProductos(){
    let url = `${URL_SERVICIOS}/producto`
    return this.http.get(url);
  }

  obtenerProducto(id:string){
    let url = `${URL_SERVICIOS}/producto/${id}`
    return this.http.get(url);
  }

  listarProductoCategoria(id:string){
    let url = `${URL_SERVICIOS}/producto/categoria/${id}`
    return this.http.get(url);
  }

}


