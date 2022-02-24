import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
export interface Message{ message ?: string;}
export interface Response{
  message: Message;
  entity: any;
  statusCode: number
}


@Injectable({
  providedIn: 'root'
})
export class CollateralService {
 

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
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


  //API endpoint
  baseURL = `${environment.collateralAPI}/collateral/`
  constructor(private http:HttpClient) { }

  //message medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string){
    this.messageSource.next(message)

  }
  //add
  createCollateral(data: any):Observable<any>{
    let API_URL  = `${this.baseURL}add`;
    return this.http.post(API_URL, data, {headers: this.headers, withCredentials:false}).pipe(
      map(
        res =>{
          return res || {}
        }
      ),
      catchError(this.errorMgmt)

    )

  }
//http://192.168.100.153:9103/collateral/rete
 
getCollateralByCode(code:any){
    let API_URL = `${this.baseURL}${code}`;
    return this.http.get(API_URL, {headers: this.headers, withCredentials:false}).pipe(
      map(
        res =>{
          return res || {}
        }
      ),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  retrieveAllColletaralsDefinitions(): Observable<Response> {
    return this.http.get<Response>(this.baseURL+'all/');
   }
  
  
  getCollateralId(id:any):Observable<any>{
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, {withCredentials:false}).pipe(
      map(
        res =>{
          return res || {}
        }
      ),
      catchError(this.errorMgmt)
    )
  }

  //update collaterals
  updateCollateral(data:any):Observable<any>{
     let API_URL = `${this.baseURL}update`;
     return this.http.put(API_URL, data).pipe(
       catchError(this.errorMgmt)
     )

  }
  // updateGlDefinition(gl: C):Observable<Message>{
  //   return this.http.put<Message>(this.baseUrl+ 'update', g)
  // }

  //deleteColaterals
  deleteCollaterals(id:any):Observable<any>{
    let API_URL =  `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, {withCredentials:false}).pipe(
      catchError(this.errorMgmt)
    )
  }

  //check event Id
  checkExistence(params:any):Observable<any>{
    let API_URL = `${this.baseURL}/check/by/CollateralTableCode`;
    return this.http.post(API_URL, {}, {params:params, headers:this.headers, withCredentials:false}).
    pipe(map(
      res =>{
        return res || {}
      }),
      catchError(this.errorMgmt)
      )
  }

  checkEntryIfExists(params:any):Observable<any>{
    let API_URL = `${this.baseURL}/check/entry/if/exist`;
    return this.http.post(API_URL, {params:params, withCredentials:false}).
    pipe(
      map((res =>{
        return res || {}
      }),
      catchError(this.errorMgmt)
      )
    )

  }
}
