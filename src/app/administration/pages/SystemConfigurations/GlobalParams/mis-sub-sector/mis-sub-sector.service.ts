import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { catchError , map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MisSubSectorService {
headers =  new HttpHeaders().set('content-type', 'application-json');

baseURL = `${environment.accountsAPI}/api/vi/mis/subsector`
  constructor(private http:HttpClient) { }

  //message medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage =  this.messageSource.asObservable();
  changeMessage(message:string){
    this.messageSource.next(message)
  }

  //Error handling
  errorMgmt(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage)
  }


  //Add
  createSubSector(data:any):Observable<any>{
    let API_URL = `${this.baseURL}/add`
    return this.http.post(API_URL, data, { headers: this.headers,
    withCredentials: false}).pipe(map(res =>
      {
        return res || {}
      }),
      catchError(this.errorMgmt)
      )
  }

  //Get all 

  getSubSector(){
    let API_URL = `${this.baseURL}/all`
    return this.http.get(API_URL, {headers:this.headers, withCredentials:false}).pipe(map(res =>{
      return res || {}
    }),
    catchError(this.errorMgmt)
    )

}

//get by id
getSubSectorId(id:any):Observable<any>{
  let API_URL = `${this.baseURL}/find/${id}`
  return this.http.get(API_URL, {withCredentials:false}).pipe(map(
    res =>{
      return res || {}
    }
  ),
  catchError(this.errorMgmt)
  )
}

//Updating the records
updateSubSector(id:string | null, data:any):Observable<any>{
  let API_URL =  `${this.baseURL}/update/${id}`;
  return this.http.put(API_URL, data, { headers:this.headers,
  withCredentials:false}).pipe(map(res => {
    return res || {}
  }),
  catchError(this.errorMgmt)
  )

}

//delete a record

deleteSubSector(id:any):Observable<any>{
  var API_URL = `${this.baseURL}/delete/${id}`
  return this.http.delete(API_URL, {withCredentials:false}).pipe(
    catchError(this.errorMgmt)
  )
}

}
  
