import { Interest } from './interfaces/interest';
import { HttpClient, HttpResponse,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Message} from './interfaces/message';
import {Response} from './interfaces/response'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  //private baseUrl: string = 'http://127.0.0.1:9100/interest/';
  baseURL = `${environment.productAPI}/interest/`; 

  constructor(private http: HttpClient) { }

  createInterest(interest: Interest): Observable<Message>{
    return this.http.post<Message>(this.baseURL+'add/', interest);
   }
   updateInterestDefinition(interest: Interest) {
    return this.http.put<Message>(this.baseURL+'update/', interest);
   }

  retrieveAllInterestDefinitions(): Observable<Response> {
    return this.http.get<Response>(this.baseURL+'all/');
   }

  retriveInterestDefinition(id: string) { 
return this.http.get<Interest>(this.baseURL+id);
  }
}
