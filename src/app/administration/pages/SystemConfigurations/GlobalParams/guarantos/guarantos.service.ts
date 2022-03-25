import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuarantosService {
  headers =  new HttpHeaders().set('Content-Type', 'application/json');

  baseURL = `${environment.productAPI}/api/v1/customer/guarantors`

  constructor(private http:HttpClient) { }
  
  //message medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage =  this.messageSource.asObservable();
  changeMessage(message:string){
    this.messageSource.next(message)
  }

  //error management
  errorMgmt(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage)
  }

  // http://localhost:9100/api/vi/customer/guarantors/eligibility%E2%80%8B/test%E2%80%8B/3223
  // http://localhost:9100/api/v1/customer/guarantors/eligibility/test/047

  // http://localhost:9100/api/v1/customer/guarantors/eligibility​/test​/3223

  //add 
testGuarantorEligibility(customer_code:any):Observable<any>{
  let API_URL = `http://localhost:9100/api/v1/customer/guarantors/eligibility​/test​/3223`
  return this.http.get(API_URL,{headers:this.headers}).pipe(map(
    res =>{
      return res || {}
    },
   catchError(this.errorMgmt)
  ))
}
getAll():Observable<any>{
  let API_URL = `http://localhost:9100/api/v1/customer/guarantors/eligibility​/test​/3223`
  return this.http.get(API_URL,{headers:this.headers}).pipe(map(
    res =>{
      return res || {}
    },
   catchError(this.errorMgmt)
  ))
}
getTermDeposits() {
  let API_URL = `${this.baseURL}/all`;
  return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
  .pipe(
    map((res) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

//get all    

// guarantorEligibilityTest

getGuarantorsConfig(id:any){
  let API_URL = `${this.baseURL}/find/${id}`
  return this.http.get(API_URL, {headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    },
    catchError(this.errorMgmt)
  ))
}

//updates
updatesRecords(data:any):Observable<any>{
  let API_URL = `${this.baseURL}/update`
  return this.http.put(API_URL, data, {headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    },
    catchError(this.errorMgmt)
  ))
}

}
