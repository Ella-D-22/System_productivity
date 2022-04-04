import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubGroupService {

  baseURL = `${environment.glsAPI}/api/v1/group/subgroup`
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

 createSubGroup(data:any):Observable<any>{
   let API_URL = `${this.baseURL}/add`
   return this.http.post(API_URL, data, {headers:this.headers, withCredentials:false}).pipe(map(
     res =>{
       return res || {}
     }, 
     catchError(this.errorMgmt)

   ))
 }

 getSubGroups(){
   let API_URL = `${this.baseURL}/all`
   return this.http.get(API_URL, {headers:this.headers, withCredentials:false}).pipe(map(
     res =>{
       console.log("service data", res);
       
       return res || {}
     },
     catchError(this.errorMgmt)
   ))
 }

 getSubGroupByCode(subgroupCode:any):Observable<any>{
   let API_URL = `${this.baseURL}/find/${subgroupCode}`
   console.log("this code",subgroupCode); 
   
   return this.http.get(API_URL, {headers:this.headers, withCredentials:false}).pipe(
     map(
       res =>{
         console.log(res);
         
         return res || {}
       },
       catchError(this.errorMgmt)
     )
   )
 }

 updateSubGroups(data:any):Observable<any>{
   let API_URL = `${this.baseURL}/update`
   return this.http.put(API_URL, data, {headers:this.headers, withCredentials:false}).pipe(map(
     res =>{
       return res || {}
     },
     catchError(this.errorMgmt)
   ))
 }
}
