import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  is_ADMIN = false;
is_USER =  false;
  role: any;
  //is_Supervisor: any;

  constructor() { }

  ngOnInit() {
    // this.Authorize();
  }



  Authorize(){
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[1];

    // First Level Authorization - Admin
    if(this.role == "ADMIN_ROLE"){
      this.is_ADMIN = true;
    }
    // Second Level AUthorization - Admin/HR
    if(this.role == "USER_ROLE" || this.role == "ADMIN_ROLE"){
      this.is_USER = true;
    }
    // Third Level AUthorization - Admin/HR/Supervisor
    // if(this.role == "ROLE_SUPERVISOR"){
    //   this.is_Supervisor = true;
    // }
    }


}
