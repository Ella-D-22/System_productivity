import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class RetailResolver implements Resolve<Response> {
  constructor(private customerservice: CustomerService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.customerservice.retrieveRetail(route.params.id);
  }
}
