import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): boolean  {
    const isLoggedIn =
    localStorage.getItem('isLoggedIn');
    if(!isLoggedIn){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
