import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { CarritoComponent } from '../../shared/carrito/carrito.component';
import { ProductoCarrito } from '../../models/productoCarrito.model';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-carritocompras',
  templateUrl: './carritocompras.component.html',
  styleUrls: ['./carritocompras.component.css']
})
export class CarritocomprasComponent implements OnInit {

  constructor(public carritoService:CarritoService,
              public router:Router,
              public _usuarioService:UsuarioService,
              public _carritoService:CarritoService,
              public route:ActivatedRoute) { }


  productos:ProductoCarrito[]=[] ;
  vista:boolean = false;
  total:number = 0;



  ngOnInit() {
    this.cargarCarro();
    this.vistaver();
    this.suma();
    this.verificarCancelacion();
  }

  verificarCancelacion(){
    let token;
    this.route.queryParams.subscribe(params => {
      token = params['token'];
    });
    if(token){
      swal('Error',`La orden ${token} ha sido cancelada`,'error')
    }
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
  localStorage.removeItem('Total');
  for (let item of this.productos) {
    this.total = (item.precio *item.cantidad) + this.total;
  }
  this.total = Number(this.total.toFixed(2));
  this.carritoService.total = this.total;
  localStorage.setItem('Total',this.carritoService.total.toString());

}

cambiarCant(index,cantidad){
  
  localStorage.removeItem('Carrito');
  this.productos[index].cantidad = cantidad;
  this. total =0;
  this.carritoService.carrito = this.productos;
  this.suma();
  localStorage.setItem('Carrito',JSON.stringify(this.carritoService.carrito));
  
}

eliminar(producto:ProductoCarrito){
    localStorage.removeItem('Carrito');
    localStorage.removeItem('Total');
    let index = this.productos.findIndex(item => item.producto === producto.producto)
    this.carritoService.carrito.splice(index,1);
    this.vistaver();
    this.cargarCarro();
    this. total =0;
    this.suma();
    localStorage.setItem('Carrito',JSON.stringify(this.carritoService.carrito));
    localStorage.setItem('Total',this.carritoService.total.toString());

};



}
