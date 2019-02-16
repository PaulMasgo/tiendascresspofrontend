import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { URL_SERVICIOS } from '../../config/config.moule';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/models/venta.model';
import { AddressService } from 'src/app/services/address.service';
import { Direccion } from 'src/app/models/direccion.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario:Usuario; 
  compras:Venta[];
  direcion:Direccion[];
  ventana:string = 'ventas' 
  constructor(public _usuarioService:UsuarioService,
              public _ventaService:VentaService,
              public _direccionservice:AddressService,
              public _ubigeoService:UbigeoService) { }

  ngOnInit() {
    this.ObtenerUsuario();
    this.verVentas();
    this.obtenerDireciones();
  }

  ObtenerUsuario(){
    this.usuario = this._usuarioService.UsuarioActivo;
    if((this.usuario.imagen.indexOf('https'))<0){
      this.usuario.imagen = URL_SERVICIOS + '/img/usuarios/' + this.usuario.imagen
    } 
  }

  verVentas(){
    this._ventaService.verVenta(this._usuarioService.UsuarioActivo._id)
    .subscribe((res:any) => {
      if(res.ok===true){
        this.compras = res.venta
      }
    });
  };

  favoritos(){
    this.ventana = 'favoritos'
  };

  obtenerDireciones(){
    this._direccionservice.obtenerdirecciones(this._usuarioService.UsuarioActivo._id)
    .subscribe((res:any) => {this.direcion = res.direccion;console.log(this.direcion)})
  }

  ventas(){
    this.ventana = 'ventas'
  }

  direcciones(){
    this.ventana = 'direcciones'
  }

  eliminardireccion(id){
    swal({
      title:'Desea eliminar la direccion?',
      text:'Si hace eso ya no podra utilizar dicha dirección',
      icon:'alert',
      buttons:[true,true],
      dangerMode:true
    }).then(res =>{
      if(res){
        this._direccionservice.eliminarDireccion(id)
        .subscribe((res:any)=>{
          swal('Realizado','La direccion ha sido eliminada','success')
        })
      }
    })
  }

}
