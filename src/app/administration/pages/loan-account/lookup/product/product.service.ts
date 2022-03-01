import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Response} from '../../interfaces/response'



@Injectable({
  providedIn: 'root'
})
export class productService {
  private baseUrl: string = 'http://127.0.0.1:9100/api/v1/product/';

  constructor(private http: HttpClient) { }

  retrieveAllProducts(type: string): Observable<Response> {
    return this.http.get<Response>(this.baseUrl+type+'/all/');
   }


}

