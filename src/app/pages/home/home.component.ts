import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CuponService } from 'src/app/services/cupon.service';
import { Cupon } from 'src/app/models/cupon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  cupon:Cupon[];
  cuponvalido:Cupon;
  productos:Producto[];

  

  constructor(public _productoService:ProductoService,
              public _usuarioService:UsuarioService,
              public _cuponService:CuponService) { }

  ngOnInit() {
    this.cargarProductos();
    this.Cargarcupones();
  }

  cargarProductos(){
    this._productoService.buscarProductos()
    .subscribe((res:any) => { 
        this.productos = res.Productos.reverse();
        this.productos.splice(4)
    })
  }

  Cargarcupones(){  
    this._cuponService.ver()
    .subscribe((res:any)=>{
      console.log(res);
      this.cupon = res.data;
      this.cuponvalido = this.cupon[this.cupon.length -1];
    })
  } 

}
