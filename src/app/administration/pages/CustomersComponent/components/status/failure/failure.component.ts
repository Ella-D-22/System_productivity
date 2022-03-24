import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {
  message:string= this.router.getCurrentNavigation().extras.state.message;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.message == undefined || this.message == null || this.message==""){
      this.message =  "An error occured, Kindly Contact your system administrator.";
    } 
  }

}
