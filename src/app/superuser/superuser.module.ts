import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperuserRoutingModule } from './superuser-routing.module';
import { SuperuserComponent } from './superuser.component';
import { SuDashboardComponent } from './pages/su-dashboard/su-dashboard.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MenuOptionBarComponent } from './layouts/menu-option-bar/menu-option-bar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MaterialModule } from '../material.module';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RolesManagementComponent } from './pages/roles-management/roles-management.component';
import { PrivilegeManagementComponent } from './pages/privilege-management/privilege-management.component';
// import { MatTableExporterModule } from 'mat-table-exporter';
import { CreateUserComponent } from './pages/user-management/create-user/create-user.component';
import { UpdateUserComponent } from './pages/user-management/update-user/update-user.component';
import { CreateRoleComponent } from './pages/roles-management/create-role/create-role.component';
import { UpdateRoleComponent } from './pages/roles-management/update-role/update-role.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuOptionBarComponent,
    FooterComponent,
    SidebarComponent,
    SuperuserComponent,
    SuDashboardComponent,
    UserManagementComponent,
    RolesManagementComponent,
    PrivilegeManagementComponent,
    CreateUserComponent,
    UpdateUserComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [
    CommonModule,
    SuperuserRoutingModule,
    MaterialModule,
    // MatTableExporterModule

  ]
})
export class SuperuserModule { }
