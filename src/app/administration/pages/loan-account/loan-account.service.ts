import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Response} from './interfaces/response'


@Injectable({
  providedIn: 'root'
})
export class LoanAccountService {
  private baseUrl: string = 'http://127.0.0.1:9099/accounts/';

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
}

