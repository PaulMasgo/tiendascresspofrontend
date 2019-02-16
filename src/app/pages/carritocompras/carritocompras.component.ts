import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { Router } from '@angular/router';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { CarritoComponent } from '../../shared/carrito/carrito.component';
import { ProductoCarrito } from '../../models/productoCarrito.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-carritocompras',
  templateUrl: './carritocompras.component.html',
  styleUrls: ['./carritocompras.component.css']
})
export class CarritocomprasComponent implements OnInit {

  constructor(public carritoService:CarritoService,public router:Router,public _usuarioService:UsuarioService,public _carritoService:CarritoService) { }


  productos:ProductoCarrito[]=[] ;
  vista:boolean = false;
  total:number = 0;



  ngOnInit() {
    this.cargarCarro();
    this.vistaver();
    this.suma();
  }

  vistaver(){
    if(this.productos.length > 0){
      this.vista = true;
    }else{
      this.vista = false;
    }
  }

  comprobar(){
    if( this._usuarioService.UsuarioActivo==null){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['payment']);
    }
   
  }

  cargarCarro(){
    let carrito = localStorage.getItem('Carrito');
    if(carrito){
      this._carritoService.carrito = JSON.parse(carrito);
    }
  
   this.productos = this.carritoService.carrito ;
  }

suma(){
  for (let item of this.productos) {
    this.total = (item.precio *item.cantidad) + this.total;
  }
  this.carritoService.total = this.total;
  console.log(this.total);
}

cambiarCant(index,cantidad){
  this.productos[index].cantidad = cantidad;
  this. total =0;
  this.suma();
}

eliminar(producto:ProductoCarrito){
    localStorage.removeItem('Carrito');
    let index = this.productos.findIndex(item => item.producto === producto.producto)
    this.carritoService.carrito.splice(index,1);
    this.vistaver();
    this.cargarCarro();
    this. total =0;
    this.suma();
    localStorage.setItem('Carrito',JSON.stringify(this.carritoService.carrito));
};



}
