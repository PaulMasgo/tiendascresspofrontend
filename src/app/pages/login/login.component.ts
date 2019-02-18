import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _usuarioService:UsuarioService,public router:Router) { }

  auth2:any;


  ngOnInit() {
    this.googleInit();
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
            this.router.navigateByUrl('/');
            swal('Bienvenido', `Hola ${this._usuarioService.UsuarioActivo.nombre}` ,'success');
            break;
        }
      }else{
        swal('Error','El usuario o contraseña son incorrectos','error')
      } 
    })
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '372675155090-hgttjr3lodmiq3gkn29le31e6emo8mc3.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element,{},(googleuser)=>{
      // let profile = googleuser.getBasicProfile();
      let token = googleuser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
      .subscribe((res:any)=>{
        if(res.ok === true){
            switch (res.usuario.estado) {
              case 'inactivo':
                swal('Cuenta Bloqueada','Para mas información comuniquese con nosotros','error');
                this.router.navigate(['/contacto']);
              break;
            
              default:
                swal('Bienvenido', `Hola ${res.usuario.nombre}` ,'success')
                .then(res =>{
                  this._usuarioService.UsuarioActivo = res.usuario;
                })
                localStorage.setItem('usuario',JSON.stringify(res.usuario))
                this.router.navigate(['/home']);
              break;
            }
        }
      })
    })
  }

}
