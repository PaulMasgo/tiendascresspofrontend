import { Component, OnInit ,Input} from '@angular/core';
import { Detalle } from 'src/app/models/detalleVenta.models';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/models/venta.model';

@Component({
  selector: 'app-detalles-venta',
  templateUrl: './detalles-venta.component.html',
  styleUrls: ['./detalles-venta.component.css']
})
export class DetallesVentaComponent implements OnInit {

  @Input() IdVenta:String;
  @Input() ViewVenta:Venta;

  detalles:Detalle[]=[];
 
  constructor(public _ventaService:VentaService) { }

  ngOnInit() {
    this.verdetalles()
  }

  verdetalles(){
    this._ventaService.detallesventa(this.IdVenta)
    .subscribe((res:any) => {
    this.detalles = res.detalle})
  }



}
