import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {


  productos:Producto[];

  constructor(public _productoService:ProductoService,
              public _usuarioService:UsuarioService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(){
    this._productoService.buscarProductos()
    .subscribe((res:any) => this.productos = res.Productos)
  }
}
