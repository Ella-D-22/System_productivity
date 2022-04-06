import { HttpClient, HttpResponse,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { corporateKyc } from '../interfaces/corporate';
import { retailKyc } from '../interfaces/retail';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl= `${environment.customerAPI}/`;

  // private baseUrl: string = 'http://127.0.0.1:9097/';


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
  retrieveCooporateCustmersPerSolCode(params:any): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'cooporate/all/by/solcode',{params:params});
    
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
  retrieveRetailCustmersPerSolCode(params:any): Observable<Response>{
    console.log("params", params);
    
    return this.http.get<Response>(this.baseUrl+'retail/all/by/solcode',{params:params});
    
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
