import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Response} from 'src/app/administration/pages/transactions/interfaces/response'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl: string = 'http://127.0.0.1:9105/transaction/';

  private AccountBaseUrl: string = 'http://127.0.0.1:9099/accounts/';

  constructor(private http: HttpClient) { }

  postCashTransaction(type: string, transaction:any){
    return this.http.post<Response>(this.baseUrl+type, transaction);
  }

  retrieveAllAccounts(type: string): Observable<Response> {
    return this.http.get<Response>(this.AccountBaseUrl+type+'/all/');
   }

}
