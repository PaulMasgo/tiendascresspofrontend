import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _usuarioService:UsuarioService) { }

  ngOnInit() {
  }

  inicioSesion(correo,password){
    let usuario = new Usuario(null,correo,password)
    this._usuarioService.login(usuario)
    .subscribe((res:any) => {
      if(res.ok === true){
        this._usuarioService.UsuarioActivo = res.usuario;
        swal('Bienvenido', `Hola ${res.usuario.nombre}` ,'success');
      }else{
        swal('Error','El usuario o contraseña son incorrectos','error')
      } 
    })
  }

}
