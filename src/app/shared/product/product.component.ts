import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() nombre:string;
  @Input() precio:number;
  @Input() imagenprincipal:string;
  @Input() imagenSecunadria:string;
  @Input() id:string;

  constructor() { }

  ngOnInit() {
  }

}
