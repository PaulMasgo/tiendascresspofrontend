import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import { isNgTemplate } from '@angular/compiler';
import { Subscriber } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  usuario:Usuario;
  nombre:string = '';

  constructor(public _usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.UsuarioActivo;
  }

  Validarcampo(nombre:String){
    let nombrecortado = nombre.split(' ');
    for (const item of nombrecortado) {
        let a = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        this.nombre = this.nombre + ' ' +a;
    };
  };

  actualizar(nombre:string,telefono1,telefono2){
    let estado = true;
    let campos = [nombre,telefono1];
    for (let i = 0; i < campos.length; i++) {
      if(campos[i].length <= 0){
        estado = false;
        break;
      }
    }

    if(estado==true){
        this.Validarcampo(nombre);
      let user = new Usuario(this.nombre.trim(),null,null,telefono1,telefono2);
      
      swal({
        title:'Desesa actualizar el perfil?',
        buttons:[true,true],
        dangerMode:true
      }).then(res =>{
        if(res){
          this._usuarioService.actualizar(user,this._usuarioService.UsuarioActivo._id)
      .subscribe((res:any) => {
        if (res.ok === true){
          this._usuarioService.UsuarioActivo = res.usuario;
          swal('Realizado','Datos actualizados','success');
          localStorage.setItem('usuario',JSON.stringify(res.usuario))
        }else{
          swal('Ocurrio un error porfavor intentelo de nuevo')
        }
      });
        }
      })
    }else{
      swal('Error','Los campos Nombre y Telefono 1 no pueden quedar vacios','error');
    }

    

  }

}
