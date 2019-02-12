import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http :HttpClient) { }

  pago(pago){
    let url = URL_SERVICIOS + '/pago/pago.json'
    return this.http.post(url,{pago:pago})
  };

}
