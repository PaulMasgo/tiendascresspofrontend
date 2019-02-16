import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos:Producto[];
  categorias:Categoria[];

  constructor(public _productoService:ProductoService,public _carritoService:CarritoService,public _categoriaService:CategoriaService) { }

  ngOnInit() {
   this.cargarProductos();
   console.log(this.productos);
   this.CargarCategorias();
  }
  

 
  buscarproductos(paraemtro:String){
    if (paraemtro.length ===0 ){
      this.cargarProductos();
    }else{
        this._productoService.buscarProductoParametro(paraemtro)
        .subscribe((res:any) => this.productos =  res.Productos)
    }
   
  }

  CargarCategorias(){
    this._categoriaService.listarCategorias().subscribe
    ((res:any) => this.categorias = res)
  }
    
  Carproductocategoria(id:string){
    if(id === 'Todo'){
      this.cargarProductos();
    }else{
        this._productoService.listarProductoCategoria(id)
    .subscribe((res:any)=> {this.productos = res;
      console.log(res);
    })
    }
  
  }

  cargarProductos(){
    this._productoService.buscarProductos()
    .subscribe((res:any) => this.productos = res.Productos)
  }

}
