import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedModuleGuard } from 'src/@core/helpers/AuthenticatedModuleGuard.guard';
import { CanLoadModuleGuard } from 'src/@core/helpers/CanLoadModule.guard';
import { Role } from 'src/@core/Models/role/role.model';
const routes: Routes = [
  { path: '', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule), },
  { path: 'sso', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'system', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    // canLoad: [AuthenticatedModuleGuard],
    // data: { roles: [Role.SUPER_ADMIN], preload: true },
  },
  {
    path: 'superuser', loadChildren: () => import('./superuser/superuser.module').then(m => m.SuperuserModule),
    // canLoad:[CanLoadModuleGuard],
    // data: { roles: [Role.SUPER_ADMIN], preload: true },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }




