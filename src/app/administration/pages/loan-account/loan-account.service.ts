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
  private baseUrl: string = `${environment.accountsAPI}/accounts/`;


  constructor(private http: HttpClient) { }

  createAccount(interest: any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'open/', interest);
   }
   updateAccount(interest: any) {
    return this.http.put<Response>(this.baseUrl+'/update/', interest);
   }


  //  {'Access-Control-Allow-Origin':'*'}
  //  setHeader("Access-Control-Allow-Origin", "https://yoursite.com")

  
  retrieveAllAccounts(type: string): Observable<Response> {

    return this.http.get<Response>(this.baseUrl+type+'/all/');
   }

  retriveAccount(id: string) { 
return this.http.get<Response>(this.baseUrl+id);
  }

  // headers = new HttpHeaders().set('Content-Type', 'application/json')
  // .set('Access-Control-Allow-Origin','*');

  //   // Get by id
  //   retrieveAllAccounts(type: string) {
  //     console.log("Hey got called");
      
  //     let API_URL = this.baseUrl+type+'/all/'
  //     return this.http.get(API_URL, {headers:this.headers, withCredentials: true })
  //       .pipe(
  //         map((res) => {
  //           return res || {}
  //         }),
  //         catchError(this.errorMgmt)
  //       )
  //   }
  // errorMgmt(errorMgmt: any): import("rxjs").OperatorFunction<any, any> {
  //   throw new Error('Method not implemented.');
  // }

}

