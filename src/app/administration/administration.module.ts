import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { authInterceptorProviders } from 'src/@core/helpers/auth.interceptor';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

import { MatTableExporterModule } from 'mat-table-exporter';
import { MenuOptionBarComponent } from './layouts/menu-option-bar/menu-option-bar.component';

import { WidgetMembershipComponent } from './pages/dashboard/widget-membership/widget-membership.component';
import { WidgetLendingComponent } from './pages/dashboard/widget-lending/widget-lending.component';
import { WidgetChargesComponent } from './pages/dashboard/widget-charges/widget-charges.component';
import { WidgetShareCapitalComponent } from './pages/dashboard/widget-share-capital/widget-share-capital.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ViewReportsComponent } from './pages/view-reports/view-reports.component';
import { DialogComponent } from './pages/dialog/dialog.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    HeaderComponent,
    MenuOptionBarComponent,
    FooterComponent,
    SidebarComponent,

    DashboardComponent,
    WidgetMembershipComponent,
    WidgetLendingComponent,
    WidgetChargesComponent,
    WidgetShareCapitalComponent,
    ReportsComponent,
    ViewReportsComponent,
    DialogComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    DataTablesModule,
    RouterModule,
    HighchartsChartModule,
    MatTableExporterModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenuOptionBarComponent
  ],
  providers: [authInterceptorProviders, ],
})
export class AdministrationModule { }
