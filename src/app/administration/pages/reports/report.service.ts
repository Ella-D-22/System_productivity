import { Injectable } from '@angular/core';
import { ReportDefination } from './interfaces/report-defination'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { DownloadRequest } from './interfaces/downloadRequest'
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // private baseUrl = 'http://localhost:9094/reports/';
  private baseUrl = `${environment.reportAPI}/reports/`;


  constructor(private http: HttpClient) { }

  addReport(reportdef: ReportDefination,jrxmlImage: File){
    const formData: FormData = new FormData();
       formData.append('jrxml', jrxmlImage);
       formData.append('reportDefinition',  JSON.stringify(reportdef));
       return this.http.post<any>(this.baseUrl+'add', formData);
  }
  // downloadReport(request: DownloadRequest){
  //   return this.http.get(this.baseUrl+'download');
  // }
  allReports(){
    return this.http.get(this.baseUrl+'all');
  }

  downloadReport(request: DownloadRequest): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob',  withCredentials: false };
    return this.http.post(this.baseUrl+'download',request,requestOptions)
      .pipe(map((response)=>{
        return {
          filename: 'account_statement.pdf',
          data: new Blob([response], {type: 'application/pdf'})
        };
      }));
  }

}
