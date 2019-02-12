import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AddressService } from 'src/app/services/address.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Direccion } from 'src/app/models/direccion.model';
import swal from 'sweetalert';
import { PagoService } from 'src/app/services/pago.service';
import { Router } from '@angular/router';

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
              public _usuarioService:UsuarioService,
              public _pagoService:PagoService,
              private router:Router) { }

  ngOnInit() {
    this. total = this._carritoService.total
    this.obtenerDireciones();
  }

  obtenerDireciones(){
    this._direccionservice.obtenerdirecciones(this._usuarioService.UsuarioActivo._id)
    .subscribe((res:any) => {this.direcion = res.direccion;console.log(this.direcion);})
  }

  pagar(){
      this._pagoService.pago(888800)
      .subscribe((res:any) => {swal(`${res.ruta}`);
      window.open(res.ruta, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")});
  }


}
