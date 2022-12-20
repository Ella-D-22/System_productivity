import { Component, OnInit } from '@angular/core';
import { User } from 'src/@core/Models/user/user.model';
import { Role } from 'src/@core/Models/role/role.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
