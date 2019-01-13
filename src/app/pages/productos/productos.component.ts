import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos:Producto[];

  constructor(public _productoService:ProductoService,public _carritoService:CarritoService) { }

  ngOnInit() {
   this.cargarProductos();
  }



  cargarProductos(){
    this._productoService.buscarProductos()
    .subscribe((res:any) => this.productos = res.Productos)
  }

}
