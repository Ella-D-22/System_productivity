import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MisSectorService {
  headers =  new HttpHeaders().set('content-type', 'application-json');

  constructor(private http:HttpClient) { }

  baseURL = `${environment.accountsAPI}/api/vi/mis/sector`;

// message medium 
private messageSource = new BehaviorSubject('default message');
currentMessage =  this.messageSource.asObservable();
changeMessage(message:string){
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

createMisSector(data:any):Observable<any>{
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

getMisSector(){
  let API_URL = `${this.baseURL}/all`
  return this.http.get(API_URL, {headers:this.headers,
  withCredentials:false}).pipe(map(res =>{
    return res || {}
  }),
  catchError(this.errorMgmt)
  )
}

//get all active sector

getAllActiveMisSector(){
  let API_URL = `${this.baseURL}/all`
  return this.http.get(API_URL, {headers:this.headers, withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    }
  ),
  catchError(this.errorMgmt)
  )
}

//get by sector id
getMisSectorId(id:any):Observable<any>{
  let API_URL = `${this.baseURL}/find/${id}`
  return this.http.get(API_URL, {withCredentials:false}).pipe(
    map(res =>{
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

//update the record
updateMisSector(id:string | null, data:any):Observable<any>{
  let API_URL = `${this.baseURL}/update/${id}`
  return this.http.put(API_URL, data, {headers:this.headers,
  withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    }
  ),
  catchError(this.errorMgmt)
  )
}

//delete a record
deleteMisSector(id:any):Observable<any>{
  let API_URL = `${this.baseURL}/delete/${id}`
  return this.http.delete(API_URL,{withCredentials:false}).pipe(
    catchError(this.errorMgmt)
  )
}


}
