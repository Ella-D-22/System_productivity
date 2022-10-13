import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorporateCustomerService {
   
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseURL = `${environment.customerAPI}/corporate`;
  constructor(private http:HttpClient) { }

      // Message Medium
      private messageSource = new BehaviorSubject('default message');
      currentMessage = this.messageSource.asObservable();
      changeMessage(message: string) {
        this.messageSource.next(message)
      }
      
 
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage);
  }
  
  
  // Add
  createCorporate(data:any):Observable<any>{
    let API_URL = `${this.baseURL}/add`
    return this.http.post(API_URL, data, { headers:this.headers, withCredentials:false}).pipe(map(
      res =>{
        return res || {}
      },
      catchError(this.errorMgmt)
    ))
  }


  // Get All
  getAllCorporates(){
    let API_URL = `${this.baseURL}/all`
    return this.http.get(API_URL, { headers:this.headers, withCredentials:false}).pipe(map(
      res =>{
        return res || {}
      },
      catchError(this.errorMgmt)
    ))
  }

  //Update a corporate 
  getCorporateByCode(code:any):Observable<any>{
    let API_URL = `${this.baseURL}/${code}`
    return this.http.get(API_URL, { withCredentials:false}).pipe(map(
      res =>{
        return res || {}
      },
      catchError(this.errorMgmt)
    ))
  }

  updateCorporateRecords(data:any):Observable<any>{
    let API_URL = `${this.baseURL}/update`
    return this.http.put(API_URL, data, {headers:this.headers, withCredentials:false}).pipe(
      catchError(this.errorMgmt)
    )
  }

}
