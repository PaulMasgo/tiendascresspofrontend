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
import { Router, ActivatedRoute } from '@angular/router';
import { PagoService } from 'src/app/services/pago.service';
import { CuponService } from 'src/app/services/cupon.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  envio:number = 15;
  total:number;
  direcion:Direccion[];
  carrito :ProductoCarrito[];
  indexDireccion:number = 0;
  tipoVenta:string= 'visa';
  descuento:number = 0;
  bloqueo:boolean = false;

  constructor(public _carritoService:CarritoService,
              public _direccionservice:AddressService,
              public _usuarioService:UsuarioService,
              public _ventaService:VentaService,
              public _tallaService:TallaService,
              public _pagoService:PagoService,
              public _cuponService:CuponService,
              public Route:Router,
              public route:ActivatedRoute) { }

  ngOnInit() {
    this.carrito =  this._carritoService.carrito;
    console.log(this.carrito);
    this. total = this._carritoService.total
    this.obtenerDireciones();
    this.verificarOrden();
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

  

  tipoPago(tipo){
    if(tipo === 'tienda'){
      this.envio = 0
    }else{
      this.envio = 15
    }
    this.tipoVenta = tipo;
    console.log(this.tipoVenta);
  }

// --------------- implementando paypal -------------

  pagar(){
    this._pagoService.pago(this._carritoService.total)
    .subscribe((res:any) => {swal('Redirigiendo al centro de pago');
    window.location.href = res.ruta});
  }

  verificarOrden(){
    let paymentid;
    this.route.queryParams.subscribe(params => {
      paymentid = params['paymentId'];
  });
    if (paymentid){
      swal(`Pago Realizado`,`La orden N° ${paymentid} sa sido correcta `,'success')
      .then((value)=>{
        return this.finalizarCompra();
      });       
    };
  }
  // ------------- termino -----------------
  
  verficarcupon(nombre){
      this._cuponService.validarcupon(nombre)
      .subscribe(((res:any) => {
        if(res.data.estado === true){
          this.descuento = res.data.descuento;
          this.bloqueo = true;
          swal('Enhorabuena!','Descuento de S/. ' + res.data.descuento,'success' )
        }else{
          swal('Lo sentimos','El cupon ingresado no es valido o ya expiro','error')
        }
      }))
  }



  RealizarPago(){
    switch (this.tipoVenta) {
      case 'visa':
      swal({
        title:'Realizar compra?',
        text:'Si acepta se le enviara al formulario de pago',
        buttons:[true,true],
        dangerMode:true
      }).then(res => {
        if(res){
          if(this.direcion.length <= 0){
            swal('Aviso!','Debe de tener una direccion','error')
          }else{
            this.pagar();
          };  
        };
      }); 
        break;

       case 'tienda':
       swal({
         title:'Relizar compra?',
         text:'El plazo para recoger el producto es de 5 dias',
         buttons:[true,true],
         dangerMode:true
       }).then((res)=>{
         if(res){
           this.finalizarCompra();
           swal('Realizado','Visite nuestras direciones en la pestaña nosotros')
         }
       })
       break; 
    
      default:
      swal({
        title:'Relizar compra?',
        text:'Se enviara un correo confirmando la entrega dentro de las 24 horas',
        buttons:[true,true],
        dangerMode:true
      }).then((res)=>{
        if(res){
          if(this.direcion.length <= 0){
            swal('Aviso!','Debe de tener una direccion','error')
          }else{
            this.finalizarCompra();
          }; 
        }
      })
        break;
    }
  }

  direccionElejida(index){
    this.indexDireccion = index;
    console.log(this.indexDireccion);
  }

  actulizarCantidad(id,cantidad){
    this._tallaService.actualizarCantidad(id,cantidad)
    .subscribe(res => console.log(res))
  }

  finalizarCompra(){
    let today = new Date().toISOString().slice(0, 10);
    let venta = new Venta(today,this._usuarioService.UsuarioActivo,(this._carritoService.total + this.envio - this.descuento),null,null,null,this.descuento,this.direcion[this.indexDireccion]._id,null,this.tipoVenta);
    this._ventaService.nuevaVenta(venta)
    .subscribe((res:any)=> {
      console.log(res);
      if(res.ok ===true){
        for (let i = 0; i < this.carrito.length; i++) {
          let detalles = new Detalle(res.venta._id,this.carrito[i].precio,this.carrito[i].cantidad,this.carrito[i].producto,this.carrito[i].talla);
          console.log(detalles);
          let cantidadfinal = this.carrito[i].tallaE.cantidad - this.carrito[i].cantidad;
          this.actulizarCantidad(this.carrito[i].tallaE._id,cantidadfinal);
          this.RegistrarDetalles(detalles);
        }
      
       
        this._carritoService.carrito = [];
        this._carritoService.total = 0;
        this.Route.navigateByUrl('/');
        localStorage.removeItem('Carrito');
        localStorage.removeItem('Total');
        swal('¡Gracias por su compra!','Estaremos informando sobre el estado de su pedido','success');
      }
    })
  }



}
