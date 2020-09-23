import { Injectable, Injector } from '@angular/core';
import { Seguro } from '../models/Seguro';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SeguroService extends BaseService<Seguro> {

  constructor(
    protected injector:Injector
  ){
    super(injector, 'seguro', "http://localhost:9000/api/seguros");
    }

    
}
