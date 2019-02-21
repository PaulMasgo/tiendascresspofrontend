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
  Departamentos:any[];
  Provincias:any[];
  Distritos:any[];
  DepartamentosSeleccionado:any;
  ProvinciasSeleccionado:any;
  DistritosSeleccionado:any;

  constructor(private _direccionService:AddressService,
              private _ubigeoService:UbigeoService,
              private _usuarioService:UsuarioService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.departamentos();
    this.estado = this.route.snapshot.paramMap.get('estado');
  }


  departamentos(){
    this._ubigeoService.listarDepartamentos()
    .subscribe((res:any) => this.Departamentos = res)}

  provincias(id){
    this._ubigeoService.listarProvincias(id)
    .subscribe((res:any) =>{ this.Provincias = res;
      this.DepartamentosSeleccionado = this.Departamentos.find(item => item.id_ubigeo === id)
      console.log(this.DepartamentosSeleccionado.nombre_ubigeo);
    })
  }

  distritos(id){
    this._ubigeoService.listarDistritos(id)
    .subscribe((res:any) => {
        this.Distritos = res;
        this.ProvinciasSeleccionado = this.Provincias.find(item => item.id_ubigeo === id);
        console.log(this.ProvinciasSeleccionado.nombre_ubigeo);
    })
  }

  selectDistrict(id){
    this.DistritosSeleccionado = this.Distritos.find(item => item.id_ubigeo === id);
    console.log(this.DistritosSeleccionado.nombre_ubigeo);
  }

  regitrarDireccion(direccio,referenia,tipo){
    let campos = [this.DepartamentosSeleccionado.nombre_ubigeo,this.ProvinciasSeleccionado.nombre_ubigeo,this.DistritosSeleccionado.nombre_ubigeo,direccio,referenia,tipo];
    let valor = true;
    for (const item of campos) {
        if(item.length<=0){
            valor = false
        }
    };

    if(valor === true){
      let ubigeo = new Ubigeo(this.DepartamentosSeleccionado.nombre_ubigeo,this.ProvinciasSeleccionado.nombre_ubigeo,this.DistritosSeleccionado.nombre_ubigeo); 
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
