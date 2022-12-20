import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  is_ADMIN = true;
  is_USER =  true;
  role: any;

  constructor(
    private dialog: MatDialog) {

    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    //console.log(ProfileComponent)
    
    this.username = currentUser.username
    this.email = currentUser.email
  }

username: any;
email: any;

  ngOnInit() {
    this.Authorize();
  }


   Authorize(){
  let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  //this.role = currentUser.roles[0];

  // First Level Authorization - Admin
  if(this.role == "ADMIN_ROLE"){
    this.is_ADMIN = true;
  }
  // Second Level AUthorization - Admin/HR
  if(this.role == "USER_ROLE" || this.role == "ADMIN_ROLE"){
    this.is_USER = true;
  }
  if(this.role == "ADMIN_ROLE"){
    this.is_USER = true;
  }
  // Third Level AUthorization - Admin/HR/Supervisor

   }
}
