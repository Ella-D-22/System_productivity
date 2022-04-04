import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

  export class HttpHeaderInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let currentUser = JSON.parse(sessionStorage.getItem('auth-user'));

    if (currentUser) {
      const accessToken = currentUser.accessToken
        const headers = new HttpHeaders({
            Authorization: `${'Bearer '+accessToken}`,
            // 'WEB-API-key': environment.webApiKey,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          });
          const cloneReq = request.clone({headers});
      

          console.log("Header Requests", cloneReq);
          
          return next.handle(cloneReq);
    }
    return next.handle(request);

    }
  }
