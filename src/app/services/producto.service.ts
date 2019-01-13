import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public http:HttpClient) { }

  buscarProductos(){
    let url = `http://localhost:3000/producto`
    return this.http.get(url);
  }

}


