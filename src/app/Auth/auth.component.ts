import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { Role } from 'src/@core/Models/role/role.model';
import { User } from 'src/@core/Models/user/user.model';
import { AuthService } from 'src/@core/AuthService/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements  OnInit, OnDestroy {

  currentUser: User = new User;

  constructor(
      private router: Router,
      private authService: AuthService
  ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  subscription: Subscription = new Subscription;
  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(() => window.scrollTo(0, 0));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/Auth/login']);
  }
}
