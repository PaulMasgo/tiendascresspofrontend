import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../models/venta.model';
import { URL_SERVICIOS } from '../config/config.moule';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http:HttpClient) { }

  nuevaVenta(venta:Venta){
    let url = URL_SERVICIOS + '/venta'
    return this.http.post(url,venta);
  }

}
