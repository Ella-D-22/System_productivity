import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import {CustomerService} from "src/app/services/customer.service"
import {Response} from 'src/app/interfaces/response'

@Injectable({
  providedIn: 'root'
})
export class CorporateResolver implements Resolve<Response> {
  constructor(private customerservice: CustomerService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.customerservice.retrieveCorporate(route.params.id);
  }
}
