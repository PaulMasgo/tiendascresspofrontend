import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { URL_SERVICIOS } from '../../config/config.moule';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;  
  constructor(public _usuarioService:UsuarioService) { }

  ngOnInit() {
    this.ObtenerUsuario();
  }

  ObtenerUsuario(){
    this.usuario = this._usuarioService.UsuarioActivo;
    this.usuario.imagen = URL_SERVICIOS + '/img/usuarios/' + this.usuario.imagen
    console.log(this.usuario.imagen);
  }
}
