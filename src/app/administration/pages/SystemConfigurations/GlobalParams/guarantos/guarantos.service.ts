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

  baseURL = `${environment.productAPI}/api/vi/customer/guarantors/config`

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

  //add 
createGuarantorsConfig(data:any):Observable<any>{
  let API_URL = `${this.baseURL}/add`
  return this.http.post(API_URL, data,{headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    },
   catchError(this.errorMgmt)
  ))
}

//get all
getAllGuarantorsConfig(){
  let API_URL = `${this.baseURL}/all`
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
