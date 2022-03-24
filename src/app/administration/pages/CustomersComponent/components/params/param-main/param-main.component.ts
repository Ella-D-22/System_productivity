import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router"

@Component({
  selector: 'app-param-main',
  templateUrl: './param-main.component.html',
  styleUrls: ['./param-main.component.scss']
})
export class ParamMainComponent implements OnInit {

  paramTabIndex: number = 1 ;

  paramCode: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
 onTabClick(value: any){
    this.paramTabIndex = value.target.value;
   
}

  navigate(){
    if (this. paramTabIndex == 1) {
      this.router.navigate(['system/customers/param/add']);
    }
    if (this. paramTabIndex == 2) {
      this.router.navigate(['system/customers/param/inquire']);
    }
    if (this. paramTabIndex == 3) {
      this.router.navigate(['param-modify']);
    }

  }

}
