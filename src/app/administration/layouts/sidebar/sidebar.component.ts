import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
is_Director = false;
is_Second_Level_prev =  false;
  role: any;

  constructor(
    private dialog: MatDialog) {

    // let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    // console.log("user", currentUser)
    // this.username = currentUser.username
    // this.email = currentUser.email
  }

username: any;
email: any;

  ngOnInit() {
    // this.Authorize();
  }


  // Authorize(){
  // let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  // this.role = currentUser.roles[0];

  // // First Level Authorization - Admin
  // if(this.role == "ROLE_DIRECTOR"){
  //   this.is_Director = true;
  // }
  // // Second Level AUthorization - Admin/HR
  // if(this.role == "ROLE_DIRECTOR" || this.role == "ROLE_HR"){
  //   this.is_Second_Level_prev = true;
  // }
  // if(this.role == "ROLE_ADMIN"){
  //   this.is_Second_Level_prev = true;
  // }
  // // Third Level AUthorization - Admin/HR/Supervisor

  // }
}
