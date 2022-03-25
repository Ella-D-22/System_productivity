import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  message!:string;

  constructor(private router: Router) { 
    this.message = this.router.getCurrentNavigation().extras.state.message;
  }

  ngOnInit(): void {
  }

}
