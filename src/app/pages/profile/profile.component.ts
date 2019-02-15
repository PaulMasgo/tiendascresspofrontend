import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { URL_SERVICIOS } from '../../config/config.moule';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/models/venta.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario:Usuario; 
  compras:Venta[];
  ventana:string = 'ventas' 
  constructor(public _usuarioService:UsuarioService,public _ventaService:VentaService) { }

  ngOnInit() {
    this.ObtenerUsuario();
    this.verVentas();
  }

  ObtenerUsuario(){
    this.usuario = this._usuarioService.UsuarioActivo;
    if((this.usuario.imagen.indexOf('https'))<0){
      this.usuario.imagen = URL_SERVICIOS + '/img/usuarios/' + this.usuario.imagen
    } 
    console.log(this.usuario.imagen);
  }

  verVentas(){
    this._ventaService.verVenta(this._usuarioService.UsuarioActivo._id)
    .subscribe((res:any) => {
      if(res.ok===true){
        console.log(res)
        this.compras = res.venta
      }
    });
  }


}
