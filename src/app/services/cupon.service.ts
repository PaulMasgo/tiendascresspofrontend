import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor(public http:HttpClient) { }

  ver(){
    let url = URL_SERVICIOS + '/cupon'
    return this.http.get(url);
  }

  validarcupon(nombre){
    let url = URL_SERVICIOS + '/cupon/' +nombre
    return this.http.get(url);
  }
}
