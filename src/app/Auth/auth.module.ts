import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/@core/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/@core/helpers/error.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { MaterialModule } from '../material.module';
import { OtpComponent } from './otp/otp.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    AuthenticatedComponent,
    OtpComponent,
    SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AuthRoutingModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },


],
})
export class AuthModule { }
