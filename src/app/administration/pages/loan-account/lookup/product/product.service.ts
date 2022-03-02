import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Response} from '../../interfaces/response'



@Injectable({
  providedIn: 'root'
})
export class productService {
  //private baseUrl: string = 'http://127.0.0.1:9100/api/v1/product/';
  private baseUrl: string = `${environment.productAPI}/api/v1/product/`;

  constructor(private http: HttpClient) { }

  retrieveAllProducts(type: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+type+'/all/');
   }


}

