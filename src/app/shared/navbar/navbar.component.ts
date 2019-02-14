import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import swal from 'sweetalert';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

    
  constructor(public _usuarioService:UsuarioService,
              private router:Router,
              public _carritoService:CarritoService,
              public _favoritoService:FavoritosService) { }

  ngOnInit() {
    $(document).ready(function() {
      $(".dropdown").hover(
          function() {
              $('.dropdown-menu', this).stop(true, true).slideDown("fast");
              $(this).toggleClass('open');
          },
          function() {
              $('.dropdown-menu', this).stop(true, true).slideUp("fast");
              $(this).toggleClass('open');
          }
      );
  });
  this.verificarStorage();
  this.cargarfavoritos();
  this.cargarCarro();
  }

  verificarStorage(){
    let user = localStorage.getItem('usuario');
    if(user){
      this._usuarioService.UsuarioActivo = JSON.parse(user);
      console.log(this._usuarioService.UsuarioActivo);
    }
  }

  cerrarSesion(){
    swal({
      title:'¿Desea cerrar la sesión?',
      icon:'info',
      buttons:[true,true],
      dangerMode:true
    }).then((res)=>{
      if(res){
        this._usuarioService.UsuarioActivo = null;
        localStorage.removeItem('usuario');
        this._favoritoService.favoritos = [];
        this.router.navigateByUrl('home');
        swal('Sesión cerrada','Vuelve Pronto!','success');
      }
    })
  }

  cargarfavoritos(){
    let _favorites;
    this._favoritoService.cargarFavoritos(this._usuarioService.UsuarioActivo._id)
    .subscribe((res:any) => {this._favoritoService.favoritos = res.Favoritos;console.log(this._favoritoService.favoritos );} );
  }

  cargarCarro(){
    let carrito = localStorage.getItem('Carrito');
    if(carrito){
      this._carritoService.carrito = JSON.parse(carrito);
    }
  }

}
