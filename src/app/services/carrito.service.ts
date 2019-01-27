import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductoCarrito } from '../models/productoCarrito.model';
import { isNgTemplate } from '@angular/compiler';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  carrito:ProductoCarrito[]=[];
  
  agregarProducto(producto:Producto){
    let carritoItem = new ProductoCarrito(producto.nombre,1,producto.precio,producto._id,producto.imagen.principal);
    let encontrado = this.carrito.find(item=> item.idProducto == producto._id)
    if(encontrado){
      let index = this.carrito.findIndex(item => item.idProducto == producto._id);
      this.carrito[index].cantidad = this.carrito[index].cantidad + 1 ;
      swal('Aviso','producto agregado nuevamente','warning')
    } else{
      this.carrito.push(carritoItem);
      swal('Realizado','Producto agregado','success')
    }
  }

}
