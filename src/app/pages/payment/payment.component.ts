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
import { TallaService } from 'src/app/services/talla.service';
import { PagosService } from 'src/app/services/pagos.service';
import { ActivatedRoute } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total:number;
  direcion:Direccion[];
  carrito :ProductoCarrito[];
  indexDireccion:number = 0;

  constructor(public _carritoService:CarritoService,
              public _direccionservice:AddressService,
              public _usuarioService:UsuarioService,
              public _ventaService:VentaService,
              public _tallaService:TallaService,
              public _pagoService:PagosService,
              public route:ActivatedRoute) { }

  ngOnInit() {
    this.carrito =  this._carritoService.carrito;
    console.log(this.carrito);
    this. total = this._carritoService.total
    this.obtenerDireciones();
    this.CancelarOrden();
  }

  CancelarOrden(){
      let codigo; 
      this.route.queryParams.subscribe(params => {
        codigo = params['token'];
    });
    if(codigo){
      swal(`Orden N° ${codigo}  cancelada`,'','error');
    }
    
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

  actulizarCantidad(id,cantidad){
    this._tallaService.actualizarCantidad(id,cantidad)
    .subscribe(res => console.log(res))
  }

  pagar(){
    this._pagoService.pago(888800)
    .subscribe((res:any) => {swal(`${res.ruta}`);
    window.location.href = res.ruta});
  }

  finalizarCompra(){
    let today = new Date().toISOString().slice(0, 10);
    let venta = new Venta(today,this._usuarioService.UsuarioActivo,this._carritoService.total,null,null,null,null,this.direcion[this.indexDireccion]._id);
    this._ventaService.nuevaVenta(venta)
    .subscribe((res:any)=> {
      if(res.ok ===true){
        for (let i = 0; i < this.carrito.length; i++) {
          let detalles = new Detalle(res.venta._id,this.carrito[i].precio,this.carrito[i].cantidad,this.carrito[i].producto,this.carrito[i].talla);
          console.log(detalles);
          let cantidadfinal = this.carrito[i].tallaE.cantidad - this.carrito[i].cantidad;
          this.actulizarCantidad(this.carrito[i].tallaE._id,cantidadfinal);
          this.RegistrarDetalles(detalles);
        }
        swal('¡Gracias por su compra!','Estaremos informando sobre el estado de su pedido','success')
      }
    })
  }



}
