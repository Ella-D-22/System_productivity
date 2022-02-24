import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';


@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  activateForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
  public token = "";
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) {
      // redirect to home if already logged in

  }

  ngOnInit() {
    //   get snapshot

    const token = this.route.snapshot.paramMap.get('{token}');
    console.log(this.token);
      this.activateForm = this.formBuilder.group({
          token:    [this.token],
      });
    //   submit event
    this.onActivate();
  }

  // convenience getter for easy access to form fields
  get f() { return this.activateForm.controls; }

  onActivate() {
  this.loading = true;
  this.authService.activate(this.f.token.value)
  .pipe(first())
  .subscribe(
      data => { },
      error => {
          this.error = error;
          console.log(this.error);
          this.loading = false;
      });
    }
}
