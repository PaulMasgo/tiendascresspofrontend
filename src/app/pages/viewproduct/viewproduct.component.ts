import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  producto:Producto;
  imagenActual:String;

  constructor(public _productoService:ProductoService,
              public route:ActivatedRoute,
              public _carritoService:CarritoService) { }

  ngOnInit() {
    this.llamarProducto();
    
    console.log(this.imagenActual);
  }

  llamarProducto(){
    let id = this.route.snapshot.paramMap.get('id');
    this._productoService.obtenerProducto(id)
      .subscribe((res:any) => {this.producto = res;
        this.imagenActual = res.imagen.principal})
    }
  
cambiarImagen(image:string){
  this.imagenActual = image;
}

}
