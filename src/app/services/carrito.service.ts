import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductoCarrito } from '../models/productoCarrito.model';
import { isNgTemplate } from '@angular/compiler';
import swal from 'sweetalert';
import { Talla } from '../models/talla.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.moule';
import { Detalle } from '../models/detalleVenta.models';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http:HttpClient) { }

  carrito:ProductoCarrito[]=[];
  total:number;
  
  agregarProducto(producto:Producto,talla:Talla){
    let carritoItem = new ProductoCarrito(producto.nombre,1,talla.cantidad,talla.nombre,producto.precio,producto._id,producto.imagen.principal,producto);
    let encontrado = this.carrito.find(item=> item.idproducto == producto._id)
    if(encontrado && encontrado.talla === carritoItem.talla){
      // let index = this.carrito.findIndex(item => item.idProducto == producto._id);
      // this.carrito[index].cantidad = this.carrito[index].cantidad + 1 ;
      swal('El producto ya fue agregado','Puede dirigirse al carrito para definir la cantidad','warning')
    } else{
      localStorage.removeItem('Carrito');
      this.carrito.push(carritoItem);
      swal('Realizado','Producto agregado','success');
      localStorage.setItem('Carrito',JSON.stringify(this.carrito));
    }
  }

  regitrarVenta(detalle:Detalle){
    let url = URL_SERVICIOS + '/detalleventa';
    return this.http.post(url,detalle)
  }

}
