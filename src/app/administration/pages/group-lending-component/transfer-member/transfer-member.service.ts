import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferMemberService {

  baseURL = `${environment.glsAPI}/api/v1/group/member/transfer/history`
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }
    //error handling
    errorMgmt(error:HttpErrorResponse){
      let errorMessage = '';
      
      if(error.error instanceof ErrorEvent){
        //get Client side error
        errorMessage = error.error.message
      }  else{
        // get-server side error
         errorMessage = `${error.error.message}`;
      }
      return throwError(errorMessage)
    }

     //message medium
 private messageSource = new BehaviorSubject('default message');
 currentMessage = this.messageSource.asObservable();
 changeMessage(message: string){
   this.messageSource.next(message)
 }

 create(data:any):Observable<any>{
   let API_URL = `${this.baseURL}/add`
   return this.http.post(API_URL, data, {headers:this.headers, withCredentials:false}).pipe(map(
     res =>{
       return res || {}
     }, 
     catchError(this.errorMgmt)

   ))
 }

}