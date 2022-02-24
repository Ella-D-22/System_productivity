import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/@core/helpers/auth.guard';
import { ModuleGuard } from 'src/@core/helpers/Module.guard';
import { Role } from 'src/@core/Models/role/role.model';



const routes: Routes = [
  { path: '', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  { path: 'sso', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  { path: 'system', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    // canLoad: [ModuleGuard],
    // data: {roles: [Role.Administrator], preload:true },
  },

  
  //  { path: 'root', loadChildren: () => import('./super-user/super-user.module').then(m => m.SuperUserModule),
  // canLoad: [ModuleGuard],
  // data: {roles: [Role.ROLE_ADMIN], preload:true },
  //  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




