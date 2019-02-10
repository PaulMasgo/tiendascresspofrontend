import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _usuarioService:UsuarioService,public router:Router) { }

  ngOnInit() {
  }

  inicioSesion(correo,password){
    let usuario = new Usuario(null,correo,password)
    this._usuarioService.login(usuario)
    .subscribe((res:any) => {
      if(res.ok === true){
        switch (res.usuario.estado) {
          case 'confirmar':
              swal('Aviso','Porfavor para continuar comprando verifique su cuenta','info');
              this.router.navigate(['/verification',res.usuario._id])
              break;

          case 'inactivo':
              swal('Cuenta Bloqueada','Para mas información comuniquese con nosotros','error');
              this.router.navigate(['/contacto'])
              break;

          default:
            this._usuarioService.UsuarioActivo = res.usuario;
            localStorage.setItem('usuario',JSON.stringify(this._usuarioService.UsuarioActivo));
            swal('Bienvenido', `Hola ${res.usuario.nombre}` ,'success');
            this.router.navigate(['/home']);
            break;
        }
      }else{
        swal('Error','El usuario o contraseña son incorrectos','error')
      } 
    })
  }

}
