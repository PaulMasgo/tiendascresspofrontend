import { Component, OnInit } from '@angular/core';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { Favorito } from 'src/app/models/favorito.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoritos:Favorito[];


  constructor(private _favoritosService:FavoritosService,private _usuarioService:UsuarioService) {this.cargar()}

  ngOnInit() {
    this.cargar();
  }




  cargar(){
      this._favoritosService.favoritos = [];
      this._favoritosService.cargarFavoritos(this._usuarioService.UsuarioActivo._id)
      .subscribe((res:any) => {this._favoritosService.favoritos = res.Favoritos;
                            this.favoritos = this._favoritosService.favoritos } );    
    
  }
 
  eliminar(id:string,index){
    swal({
      title: "Estas seguro?",
      text: "Al eliminar el elemnto ya no estar en su lista de guradados",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true,
    })
    .then((a) => {
      if (a) {
          this._favoritosService.eliminarfavorito(id)
        .subscribe(res => {
          this._favoritosService.favoritos.splice(index,1)
       });
        swal("Prenda eliminada", {
        icon: "success"});
      } 
    });  
  }


}
