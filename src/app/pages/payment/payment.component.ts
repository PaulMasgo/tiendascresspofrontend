import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AddressService } from 'src/app/services/address.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Direccion } from 'src/app/models/direccion.model';
import { ProductoCarrito } from 'src/app/models/productoCarrito.model';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/models/venta.model';
import { Detalle } from 'src/app/models/detalleVenta.models';
import swal from 'sweetalert';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total:number;
  direcion:Direccion[];
  carrito :ProductoCarrito[];
  indexDireccion:Number = 0;

  constructor(public _carritoService:CarritoService,
              public _direccionservice:AddressService,
              public _usuarioService:UsuarioService,
              public _ventaService:VentaService) { }

  ngOnInit() {
    this.carrito =  this._carritoService.carrito;
    console.log(this.carrito);
    this. total = this._carritoService.total
    this.obtenerDireciones();
  }

  obtenerDireciones(){
    this._direccionservice.obtenerdirecciones(this._usuarioService.UsuarioActivo._id)
    .subscribe((res:any) => {this.direcion = res.direccion;console.log(this.direcion)})
  }


  RegistrarDetalles(detalle:Detalle){
      this._carritoService.regitrarVenta(detalle)
      .subscribe((res:any) => {
        if(res.ok===false){
          return;
        }
      })
  };


  RealizarPago(){
    swal({
      title:'Realizar compra?',
      text:'Si acepta se le enviara al formulario de pago',
      buttons:[true,true],
      dangerMode:true
    }).then(res => {
      if(res){
        this.finalizarCompra();

      }
    }) 
  }

  direccionElejida(index){
    this.indexDireccion = index;
    console.log(this.indexDireccion);
  }

  finalizarCompra(){
    let today = new Date().toISOString().slice(0, 10);
    let venta = new Venta(today,this._usuarioService.UsuarioActivo,this._carritoService.total);
    this._ventaService.nuevaVenta(venta)
    .subscribe((res:any)=> {
      if(res.ok ===true){
        for (let i = 0; i < this.carrito.length; i++) {
          let detalles = new Detalle(res.venta._id,this.carrito[i].precio,this.carrito[i].cantidad,this.carrito[i].producto,this.carrito[i].talla);
          console.log(detalles);
          this.RegistrarDetalles(detalles);
        }
        swal('¡Gracias por su compra!','Estaremos informando sobre el estado de su pedido','success')
      }
    })
  }



}
