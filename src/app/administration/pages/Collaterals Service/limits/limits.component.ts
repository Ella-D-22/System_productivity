import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LimitsService } from './limits.service';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.scss']
})
export class LimitsComponent implements OnInit {


  function_type:any
  subscribtion:Subscription
  horizonatalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition

  constructor(private fb:FormBuilder,
    private NodesApi:LimitsService,
    private _snackbar:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
    this.getPage()
  }

  formData = this.fb.group({
   cust_code: [''],
  deleteFlag: [''],
  deletedBy: [''],
  deletedTime: [''],
  id: [],
  limit_node: [''],
  limit_node_category: [''],
  limit_node_value: [''],
  modifiedBy: [''],
  modifiedTime: [''],
  postedBy: [''],
  postedFlag: [''],
  postedTime: [''],
  verifiedBy: [''],
  verifiedFlag: [''],
  verifiedTime: ['']
  })

  get f() { 
    return this.formData.controls; }

  
  getPage(){

    if(this.function_type ==  'A-Add'){

    }else if(this.function_type == 'I-Inquire'){

    }else if(this.function_type == 'M-Modify'){

    }else if(this.function_type == 'X-Delete'){

    }else if(this.function_type == 'V-verify'){

    }
  }

  onSubmit(){
    if(this.formData.valid){
      if(this.function_type == "A-Add"){

      }else if(this.function_type == "I-Iquire"){

      }else if(this.function_type == "M-Modify"){

      }else if(this.function_type == "X-Delete"){

      }else if(this.function_type == "V-verify"){

      }
    }else{
       this._snackbar.open("Invalid Form Data Value", "Try Again",{
         horizontalPosition:this.horizonatalPosition,
         verticalPosition:this.verticalPosition,
         duration:3000,
         panelClass:['red-snackbar', 'login-snackbar']
       })
    }
  }
}
