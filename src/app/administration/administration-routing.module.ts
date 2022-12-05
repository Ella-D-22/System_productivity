import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateModuleGuard } from 'src/@core/helpers/CanActivateModule.guard';
import { Role } from 'src/@core/Models/role/role.model';
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ViewReportsComponent } from './pages/view-reports/view-reports.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'add-reports',
        component: ReportsComponent,
       
      },
      {
        path: 'view-reports',
        component: ViewReportsComponent,
       
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule { }
