import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AddressService } from 'src/app/services/address.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Direccion } from 'src/app/models/direccion.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total:number;
  direcion:Direccion[];

  constructor(public _carritoService:CarritoService,
              public _direccionservice:AddressService,
              public _usuarioService:UsuarioService) { }

  ngOnInit() {
    this. total = this._carritoService.total
    this.obtenerDireciones();
  }

  obtenerDireciones(){
    this._direccionservice.obtenerdirecciones(this._usuarioService.UsuarioActivo._id)
    .subscribe((res:any) => {this.direcion = res.direccion;console.log(this.direcion);})
  }

}
