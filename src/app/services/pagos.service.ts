import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor( public http:HttpClient) { }

 pago(pago){
  let url = URL_SERVICIOS + '/pago';
  return this.http.post(url,{pago:pago}) 
 }

 vercodigo(codigo){
  let url = URL_SERVICIOS + '/pago/'+ codigo;
  return this.http.get(url) 
 }

}
