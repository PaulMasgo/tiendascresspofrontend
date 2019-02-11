import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { Direccion } from 'src/app/models/direccion.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';
import { ActivatedRoute ,Route, Router} from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  estado:string;

  constructor(private _direccionService:AddressService,
              private _ubigeoService:UbigeoService,
              private _usuarioService:UsuarioService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.estado = this.route.snapshot.paramMap.get('estado');
  }



  regitrarDireccion(departamento,provincia,distrito,direccio,referenia,tipo){
    let campos = [departamento,provincia,distrito,direccio,referenia,tipo];
    let valor = true;
    for (const item of campos) {
        if(item.length<=0){
            valor = false
        }
    };

    if(valor === true){
      let ubigeo = new Ubigeo(departamento,provincia,distrito); 
        this._ubigeoService.registrar(ubigeo)
        .subscribe((res:any)=>{
          if(res.ubigeo){
              let direccion = new Direccion(direccio,tipo,res.ubigeo,this._usuarioService.UsuarioActivo,referenia);
              this._direccionService.agregar(direccion).
              subscribe(res =>{ swal('Direccion Registrada','','success')
              if(this.estado === 'pago'){
                  this.router.navigate(['/payment'])
              }else{
                this.router.navigate(['/profile'])
              }})
          };
        });
    }else{
      swal('Error','Ningun campo puede quedar vacio','error')
    }
  }

}
