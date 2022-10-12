import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Response} from '../../interfaces/response'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://127.0.0.1:9099/users/';

  constructor(private http: HttpClient) { }

  retrieveAllUsers(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl+'/all/');
   }

}

