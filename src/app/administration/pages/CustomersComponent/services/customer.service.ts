import { HttpClient, HttpResponse,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { corporateKyc } from '../interfaces/corporate';
import { retailKyc } from '../interfaces/retail';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string = 'http://127.0.0.1:9097/';

  constructor(private http: HttpClient) { }

  //corporate
  createCorporate(corporate: corporateKyc): Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'corporate/add/', corporate);

  }

  retrieveCorporate(id: string): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'corporate/'+id);
  }
  retrieveAllCorporate(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'corporate/all/');
    
  }
  updateCorporate(corporate: corporateKyc): Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'corporate/update/', corporate);
    
  }

  //retail
  createRetail(retail: retailKyc): Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'retail/register/', retail);

  }

  retrieveRetail(id: string): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'retail/'+id);
  }
  retrieveAllRetail(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'retail/all/');
    
  }
  updateRetail(retail: retailKyc): Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'retail/update/', retail);
    
  }

  //params
  createParam(param: any) : Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'cust-params/add/', param);
  }
  getParam() : Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'cust-params/fetch/');
  }

  updateParam(param: any) : Observable<Response>{
    return this.http.put<Response>(this.baseUrl+'cust-params/update/', param);
  }

}
