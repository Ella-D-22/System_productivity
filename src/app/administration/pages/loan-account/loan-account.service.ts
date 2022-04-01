import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Response} from './interfaces/response'
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoanAccountService {
  // private baseUrl: string = 'http://127.0.0.1:9099/accounts/';
  private baseUrl: string = `${environment.accountAPI}/accounts/`;
  private testUrl: string = `${environment.productAPI}/api/v1/customer/guarantors/`
  constructor(private http: HttpClient) { }

  createAccount(interest: any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'open/', interest);
   }
   updateAccount(interest: any) {
    return this.http.put<Response>(this.baseUrl+'/update/', interest);
   }



  
  retrieveAllAccounts(type: string): Observable<Response> {

    return this.http.get<Response>(this.baseUrl+type+'/all/');
   }

  retriveAccount(id: string) { 
return this.http.get<Response>(this.baseUrl+id);
  }

  //testing guarantor eligibility
  getCustomerEligibility(customer_code:any):Observable<any>{
    // let API_URL = `${this.testUrl}/eligibility/test/${customer_code}`
    // return this.http.post(API_URL, {})
    return this.http.post<Response>(this.testUrl+'/eligibility/test/', customer_code)
  }

}

