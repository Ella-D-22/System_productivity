import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShareCapitalService {

 
  headers =  new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http:HttpClient) { }

  baseURL = `${environment.accountAPI}/api/vi/sharecapital`;

  //message medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
//error Handling
errorMgmt(error:HttpErrorResponse){
  let errorMessage = '';
  if(error.error instanceof ErrorEvent){
    errorMessage = error.error.message;
  }else{
    errorMessage = `${error.error.message}`;
  }
  return throwError(errorMessage)
}


createShareCapital(data:any):Observable<any>{
  let API_URL = `${this.baseURL}/add`
  return this.http.post(API_URL, data, {headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    }, 
    catchError(this.errorMgmt)

  ))
}

getShareCapital(){
  let API_URL = `${this.baseURL}/all`
  return this.http.get(API_URL, {headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      console.log("service data", res);
      
      return res || {}
    },
    catchError(this.errorMgmt)
  ))
}
getShareCapitalByCode(id:any):Observable<any>{
  let API_URL = `${this.baseURL}/${id}`
  return this.http.get(API_URL, {headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    },
    catchError(this.errorMgmt)
  ))
}

updateShareCapital(data:any):Observable<any>{
  let API_URL = `${this.baseURL}/update/`
  return this.http.put(API_URL, data, {headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    },
    catchError(this.errorMgmt)
  ))
}
}
