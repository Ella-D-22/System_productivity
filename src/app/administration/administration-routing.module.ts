import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateModuleGuard } from 'src/@core/helpers/CanActivateModule.guard';
import { Role } from 'src/@core/Models/role/role.model';
import { AdministrationComponent } from './administration.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DialogComponent } from './pages/dialog/dialog.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ViewReportsComponent } from './pages/view-reports/view-reports.component';
import { AuthenticatedModuleGuard } from 'src/@core/helpers/AuthenticatedModuleGuard.guard';
import { AuthGuardService } from 'src/@core/helpers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      // {
      //   path: 'add-reports',
      //   component: ReportsComponent,
       
      // },
      {
        path: 'view-reports',
        component: ViewReportsComponent,
         canLoad: [AuthenticatedModuleGuard],
        data: { roles: [Role.ROLE_ADMIN], preload: true }
   
      },
      {
        path: 'add/view-employees',
        component: AdminComponent,
    //     canLoad: [AuthenticatedModuleGuard],
    // data: { roles: [Role.ROLE_ADMIN], preload: true },
canActivate: [AuthGuardService]
      },
      {
        path: 'add/view-employees',
        component: DialogComponent,
        
      },
      {
        path: 'administration/profile',
        component: ProfileComponent,
        
      }
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule { }
