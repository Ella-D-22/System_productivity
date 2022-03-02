import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {Response} from '../../interfaces/response'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  //private baseUrl: string = 'http://127.0.0.1:8000/branches/';
  private baseUrl: string = `${environment.systemAPI}/branch`;

  constructor(private http: HttpClient) { }

  retrieveAllBranches(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl+'/all/');
   }
}

