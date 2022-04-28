import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule),  },
  { path: 'sso', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  { path: 'system', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    // canLoad: [CanLoadModuleGuard],
    data: {preload:true },
  },
  { path: 'superuser', loadChildren: () => import('./superuser/superuser.module').then(m => m.SuperuserModule),
  
    // canLoad: [CanLoadModuleGuard],
    // data: {preload:true },
 }
];



@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }




