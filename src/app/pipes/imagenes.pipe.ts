import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config.moule';

@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  transform(img:string): any {
    
    let url = URL_SERVICIOS + `/img/productos/${img}`
    return url;
  }

}
