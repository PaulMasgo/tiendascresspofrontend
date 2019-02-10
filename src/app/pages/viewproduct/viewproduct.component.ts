import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { TallaService } from '../../services/talla.service';
import { Talla } from '../../models/talla.models';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { Favorito } from 'src/app/models/favorito.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  producto:Producto;
  imagenActual:String;
  id:string;
  tallas : Talla[];
  indextalla:number = 0;


  constructor(public _productoService:ProductoService,
              public route:ActivatedRoute,
              public _carritoService:CarritoService,
              public _tallaservice:TallaService,
              public _favoritoservice:FavoritosService,
              public _usuarioService:UsuarioService) { }

      ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.llamarProducto();
        this.listar();
        console.log(this.imagenActual);
      }

    

    llamarProducto(){
    this._productoService.obtenerProducto(this.id)
      .subscribe((res:any) => {this.producto = res;
        this.imagenActual = res.imagen.principal})
    }
  
    cambiarImagen(image:string){
      this.imagenActual = image;
    }
    
    tallaElejida(index){
      this.indextalla = index;
      console.log(this.indextalla);
    }

    listar(){
      this._tallaservice.listar(this.id)
      .subscribe((res:any) =>{this.tallas = res.tallas} )
    }

    addfavorite(){
      swal({
        title:'Desea agregar?',
        text:'La prenda se guardara dentro de sus favoritos',
        buttons:[true,true],
        dangerMode:true
      }).then(res => {
        if(res){
          let favorito = new Favorito( this.producto ,this._usuarioService.UsuarioActivo._id);
          this._favoritoservice.agregarFavorito(favorito)
          .subscribe(res => {swal('Agregado','la prenda se gurdo dentro de favoritos','success')})
        }
      }) 
    }
}
