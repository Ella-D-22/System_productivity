import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';


const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      component: LoginComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },

    {
      path: 'Authenticated',
      component: AuthenticatedComponent,
    },


    {
      path: 'Reset_Password',
      component: ResetPasswordComponent,
    },

    {
      path: 'Set_New_Password/token/:{token}',
      component: NewPasswordComponent,
    },



  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
