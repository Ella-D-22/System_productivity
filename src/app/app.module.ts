import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DataTablesModule } from 'angular-datatables';
import { ModuleGuard } from 'src/@core/helpers/Module.guard';
import { authInterceptorProviders } from 'src/@core/helpers/auth.interceptor';
import { FileInputConfig, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { NgxEchartsModule } from 'ngx-echarts';
import { DatePipe } from '@angular/common';
import { AdministrationModule } from './administration/administration.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    DataTablesModule,
    AdministrationModule,

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       // Register the ServiceWorker as soon as the app is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     })
  ],exports: [
    MaterialModule
  ],


  // add with module injection
  providers: [
    DatePipe,
    ModuleGuard,authInterceptorProviders, { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }],
  bootstrap: [AppComponent]
})
export class AppModule { }
