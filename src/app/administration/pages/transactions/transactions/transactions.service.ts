import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Response} from 'src/app/administration/pages/transactions/interfaces/response'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl: string = `${environment.transactionAPI}/transaction/`;

  baseURL = `${environment.productAPI}/api/v1/product/caa`;


  private AccountBaseUrl: string = `${environment.accountAPI}/accounts/`;

  transactionAPI

  constructor(private http: HttpClient) { }

  postCashTransaction(type: string, transaction:any){
    return this.http.post<Response>(this.baseUrl+type, transaction);
  }

  retrieveAllAccounts(type: string): Observable<Response> {
    return this.http.get<Response>(this.AccountBaseUrl+type+'/all/');
   }

}
