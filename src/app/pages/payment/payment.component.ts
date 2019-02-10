import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total:number

  constructor(public _carritoService:CarritoService) { }

  ngOnInit() {
    this. total = this._carritoService.total
  }

}
