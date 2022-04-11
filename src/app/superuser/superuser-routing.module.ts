import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateModuleGuard } from 'src/@core/helpers/CanActivateModule.guard';
import { PrivilegeManagementComponent } from './pages/privilege-management/privilege-management.component';
import { RolesManagementComponent } from './pages/roles-management/roles-management.component';
import { SuDashboardComponent } from './pages/su-dashboard/su-dashboard.component';
import { CreateUserComponent } from './pages/user-management/create-user/create-user.component';
import { UpdateUserComponent } from './pages/user-management/update-user/update-user.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { SuperuserComponent } from './superuser.component';

const routes: Routes = [{
  path: '',
  component: SuperuserComponent,
  children: [
    {
      path: '',
      component: SuDashboardComponent
    },
    {
      path: 'dashboard',
      component:SuDashboardComponent,
      // canActivate: [CanActivateModuleGuard],
      // data: {preload:true },
    },
    {
      path: 'manage/user',
      component:UserManagementComponent,
      // canActivate: [CanActivateModuleGuard],
      // data: {preload:true },
    },
    {
      path: 'manage/user/create',
      component:CreateUserComponent,
      // canActivate: [CanActivateModuleGuard],
      // data: {preload:true },
    },
    {
      path: 'manage/user/update/:username',
      component:UpdateUserComponent,
      // canActivate: [CanActivateModuleGuard],
      // data: {preload:true },
    },
    
    
    {
      path: 'manage/roles',
      component:RolesManagementComponent,
      // canActivate: [CanActivateModuleGuard],
      // data: {preload:true },
    },
    {
      path: 'manage/preveleges',
      component:PrivilegeManagementComponent,
      // canActivate: [CanActivateModuleGuard],
      // data: {preload:true },
    },


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperuserRoutingModule { }
