import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubSegmentService {
  headers =  new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http:HttpClient) { }

  baseURL = `${environment.customerAPI}/api/v1/subsegment`;
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

createSubSegment(data:any):Observable<any>{
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

getAllSubSegment(){
  let API_URL = `${this.baseURL}/all`
  return this.http.get(API_URL, {headers:this.headers,
  withCredentials:false}).pipe(map(res =>{
    return res || {}
  }),
  catchError(this.errorMgmt)
  )
}
//get records by code
getSubSectorByCode(subSegmentCode:any):Observable<any>{
  let API_URL = `${this.baseURL}/find/${subSegmentCode}`
  return this.http.get(API_URL,{withCredentials:false}).pipe(
    map(res =>{
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

//update the record
updateSubSegment(data:any):Observable<any>{
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
