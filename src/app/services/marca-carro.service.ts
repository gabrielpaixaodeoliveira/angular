import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import {MarcaCarro} from '../models/MarcaCarro'
interface CarResponse{
  Makes: Array<any>;
}
@Injectable({
  providedIn: 'root'
})
export class MarcaCarroService {
  private API_CARROS = 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes';
  constructor(
    private http: HttpClient
  ) { }


  public getMarcas(): Observable<MarcaCarro[]>{
    return this.http.jsonp(this.API_CARROS, 'callback')
    .pipe(
      map((res: CarResponse)=> this.mapMarcas(res.Makes))
    )
  }

  private mapMarcas(marcas): MarcaCarro[]{
    return marcas.map(marc => ({
      codigo: marc.make_id,
      nome: marc.make_display
    }))
  }
}
