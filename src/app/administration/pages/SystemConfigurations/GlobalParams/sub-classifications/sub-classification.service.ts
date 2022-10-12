import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubClassificationService {

  headers =  new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http:HttpClient) { }

  baseURL = `${environment.productAPI}/api/vi/sub/classification`;

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

//add

createSubClassification(data:any):Observable<any>{
  let API_URL = `${this.baseURL}/add`
  return this.http.post(API_URL, data, {headers: this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    }
  ),
  catchError(this.errorMgmt)
  )
}

//get all

getAllSubClassifications(){
  let API_URL = `${this.baseURL}/all`
  return this.http.get(API_URL, {headers:this.headers,
  withCredentials:false}).pipe(map(res =>{
    return res || {}
  }),
  catchError(this.errorMgmt)
  )
}
//get records by code
getSubClassificationByCode(subClassificationCode:any):Observable<any>{
  let API_URL = `${this.baseURL}/find/${subClassificationCode}`
  return this.http.get(API_URL,{withCredentials:false}).pipe(
    map(res =>{
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}
//update the record
updateSubClassification(data:any):Observable<any>{
  let API_URL = `${this.baseURL}/update`
  return this.http.put(API_URL,data ,{headers:this.headers,
  withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    }
  ),
  catchError(this.errorMgmt)
  )
}

}
