import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';
import { Favorito } from '../models/favorito.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(public http:HttpClient) { }

  favoritos:Favorito[]=[];

  agregarFavorito(favorito:Favorito){
    let url = URL_SERVICIOS + '/favoritos'
    return this.http.post(url,favorito);
  }

  cargarFavoritos(usuario:String){
    let url = URL_SERVICIOS + `/favoritos/${usuario}`
    return this.http.get(url);
  }

  eliminarfavorito(producto:string){
    let url = URL_SERVICIOS + `/favoritos/${producto}`
    return this.http.delete(url);
  }

}
