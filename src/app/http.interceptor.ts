import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

  

  export class HttpHeaderInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let currentUser = JSON.parse(localStorage.getItem('auth-user'));
     console.log("Hey user", currentUser);
     


    if (currentUser) {
      const accessToken = currentUser.accessToken
      console.log("Hey Access token", accessToken  );
      
        const headers = new HttpHeaders({
            Authorization: `${'Bearer' + accessToken}`,
            // 'WEB-API-key': environment.webApiKey,
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*'
          });
          const cloneReq = request.clone({headers});
      
          return next.handle(cloneReq);
    }
    return next.handle(request);

    }
  }
