import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styles: []
})
export class VerificationComponent implements OnInit {


  constructor(public route:ActivatedRoute,public _usuarioService:UsuarioService,public router:Router) { }

  ngOnInit() {
  }

  Verificar(codigo:string){
    let id  = this.route.snapshot.paramMap.get('id');
    this._usuarioService.verificar(id,codigo)
    .subscribe((res:any) => {
      if(res.usuario){
        swal('Bienvenido',`Gracias ${res.usuario.nombre} por ser parte de nosotros`,'success');
        this.router.navigate(['/login']);
      }else{
        swal('Error','Error el codigo imgresado no es el correcto','error');
      }
    })
  }

}
