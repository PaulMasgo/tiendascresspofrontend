import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config.moule';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(public http:HttpClient) { }
  
  pago(pago){
    let url = URL_SERVICIOS + '/pago';
    return this.http.post(url,{monto:pago}) 
   }
  
   vercodigo(codigo){
    let url = URL_SERVICIOS + '/pago/'+ codigo;
    return this.http.get(url) 
   }



}
