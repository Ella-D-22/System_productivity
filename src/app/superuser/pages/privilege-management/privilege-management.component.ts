import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrivilegeManagementService } from './privilege-management.service';

@Component({
  selector: 'app-privilege-management',
  templateUrl: './privilege-management.component.html',
  styleUrls: ['./privilege-management.component.scss']
})
export class PrivilegeManagementComponent implements OnInit {
  isEnabled = false;
  submitted = false;
 subscription:Subscription
 message:any
 function_type:any
 loading = false
 group_code:any
 results:any
 error:any
 dialogData:any
 groupCode:any
 isSubmitted = false;
 isDeleted = false

  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition

  user = "Nobody"
  names: any;
  constructor(private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private privilegeService: PrivilegeManagementService,
    private router:Router) { 
      this.form = fb.group({
        selectedCountries:  new FormArray([])
       });
    }

  ngOnInit(): void {
    this.getPage()
    this.onAddField()
  }

  modulesArray:any = [
    'Transaction Maintenance', 'Group Module', 'Customer Maintenance', 'Collateral Maintenance', 'Limits Maintenance'
  ]
  privilegesArray: Array<any>  = [{
    name: 'ADD',
    value: 'ADD'
  }, {
    name: 'INQUIRE',
    value: 'INQUIRE'
  }, {
    name: 'MODIFY',
    value: 'MODIFY'
  }, {
    name: 'VERIFY',
    value: 'VERIFY'
  }, {
    name: 'DELETE',
    value: 'DELETE'
  }
];

form: FormGroup;
countries: Array<any> = [
  { name: 'India', value: 'india' },
  { name: 'France', value: 'france' },
  { name: 'USA', value: 'USA' },
  { name: 'Germany', value: 'germany' },
  { name: 'Japan', value: 'Japan' }
];


onCheckboxChange(event: any) {
  const selectedCountries = (this.form.controls.selectedCountries as FormArray);
  if (event.target.checked) {
    selectedCountries.push(new FormControl(event.target.value));
  } else {
    const index = selectedCountries.controls
    .findIndex(x => x.value === event.target.value);
    selectedCountries.removeAt(index);
  }
}


onGetsubmit() {
  console.log(this.form.value);
}




  formData = this.fb.group({
    name: [''],
    modules: new FormArray([])
  })
  previlageData = this.fb.group({
    Add: [''],
    Inquire:[''],
    Modify:[''],
    Verify:[''],
    Delete:['']
  })


  get f() { return this.formData.controls; }
  get g(){return this.f.modules as FormArray}
  // {
  //   "name": "Customer"
  //   "modules": [
  //     {
  //       "name": "Transactions",
  //       "privileges": [
  //         "ADD","INQUIRE","DELETE"
  //       ]
  //     }
  //   ],
  // }

    onAddField(){
      this.g.push(this.fb.group({
        name: [''],
        privileges: new FormArray([])
      }))

      
      
    }
    onRemoveField(i:any){
      this.g.removeAt(i)
    }
    disabledFormControl(){
      this.formData.disable()
    }
    getPage(){
      this.subscription = this.privilegeService.currentMessage.subscribe(
        message =>{
          this.message = message
          this.function_type = this.message.function_type
          this.names = this.message.names
          if(this.function_type == "A-Add"){
            this.isEnabled =  true;
            this.isSubmitted = true;
            this.formData = this.fb.group({
              name: [''],
              modules: new FormArray([])
            });
          } else if(this.function_type == "I-Inquire"){
            this.loading = true
            this.disabledFormControl()
           
          } else if(this.function_type == "M-Modify"){
            this.loading = true
            this.isSubmitted = true
           
          } else if(this.function_type == "X-Delete"){
            this.loading = true
             this.disabledFormControl()
            this.isDeleted = true
          
          }else if(this.function_type == "V-Verify"){
            this.loading = true
            this.isSubmitted = true;

          }
        }
      )
    }

    onSubmit(){
      console.log("Hey data", this.formData.value);
      
      if(this.formData.valid){
        if(this.function_type == "A-Add"){
          this.isEnabled = true;
          this.subscription = this.privilegeService.createPrivilegeManagement(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigateByUrl("system/GLS/main-group/maintenance")
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }
          )
        } else if(this.function_type != "A-Add"){
          this.subscription = this.privilegeService.updatePrivilegeManagement(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigateByUrl("system/GLS/main-group/maintenance")
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }
          )
        } 
      }
    }
}