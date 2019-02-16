import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion.model';
import { AddressService } from 'src/app/services/address.service';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { Unsubscribable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  id:string;
  direccion:Direccion;

  constructor(public route:ActivatedRoute,public _direccionService:AddressService,public _ubigeoService:UbigeoService,public _usuarioService:UsuarioService, public router:Router) { }

  ngOnInit( ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.obtenerDireccion();
  }

  obtenerDireccion(){
      this._direccionService.verdireccion(this.id)
      .subscribe((res:any) =>{
        console.log(res);
        this.direccion = res.direccion;
      })
  };



  actualizarDireccion(departamento,provincia,distrito,direccio,referenia,tipo){
    let campos = [departamento,provincia,distrito,direccio,referenia,tipo];
    let valor = true;
    for (const item of campos) {
        if(item.length<=0){
            valor = false
        }
    };

    if(valor === true){
      let ubigeo = new Ubigeo(departamento,provincia,distrito); 
        this._ubigeoService.actualizar(ubigeo,this.direccion.Ubigeo._id)
        .subscribe((res:any)=>{
          console.log(res);
          if(res.ubigeo){
              let direccion = new Direccion(direccio,tipo,res.ubigeo,this._usuarioService.UsuarioActivo,referenia);
              this._direccionService.actualizarDireccion(direccion,this.id).
              subscribe(res =>{ 
                console.log(res);
                swal('Direccion Actualizada','','success')
                this.router.navigate(['/profile'])
              })
          };
        });
    }else{
      swal('Error','Ningun campo puede quedar vacio','error')
    }
  }

 
}
