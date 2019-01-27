import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {


  productos:Producto[];

  constructor(public _productoService:ProductoService) { }

  ngOnInit() {
  }


  cargarProductos(){
    this._productoService.buscarProductos()
    .subscribe((res:any) => this.productos = res.Productos)
  }
}
