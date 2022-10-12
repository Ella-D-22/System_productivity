import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { param } from 'jquery';
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
  respData: any;
  default = "Select Module"
  checked = false;
  defaultitem = "Select Module"
  constructor(private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private privilegeService: PrivilegeManagementService,
    private router:Router) { 
    }
  ngOnInit(): void {
    this.getPage()
  }
form = this.fb.group({
  previleges:  new FormArray([])
 });
// main 
  formData = this.fb.group({
    name: [''],
    modules: new FormArray([])
  })
  get f() { return this.formData.controls; }
  get g(){return this.f.modules as FormArray}
  modulesArray:any = [
    'Transaction Maintenance', 'Group Module', 'Customer Maintenance', 'Collateral Maintenance', 'Limits Maintenance'
  ]
  privilegesArray = new Array();
    onAddField(){
      this.g.push(this.fb.group({
        name: [''],
        privileges: new FormArray([])
      }))
    }
    onAddExistField(i:any){
      this.default = i.name;
      this.g.push(this.fb.group({      
        name: [i.name],
        privileges: new FormArray([])
      }))
      // this.defaultitem =  i.name;
      // this.g.at(i).get['name'].  .con setValue(i.name, {onlySelf: true});
      console.log("Hey respond",i.privileges);
      this.privilegesArray = i.privileges;
      for(var j=0; j<this.privilegesArray.length; j++){
      //  previleges[i].
        console.log("Hey j", this.privilegesArray[j]);
        if(this.privilegesArray[j]){
          this.checked = true;
        }
       }
      // this.g.at(i).get("name").setValue(i.name);
    }
    onCheckboxChange(i: any, event: any) {
      const previleges = (this.g.at(i).get("privileges") as FormArray);
      if (event.target.checked) {
        previleges.push(new FormControl(event.target.value));
      } else {
        const index = previleges.controls
        .findIndex(x => x.value === event.target.value);
        previleges.removeAt(index);
      }
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
            this.privilegesArray  = ['ADD','INQUIRE','MODIFY','VERIFY','DELETE'];

            this.isEnabled =  true;
            this.isSubmitted = true;
            this.formData = this.fb.group({
              name: [''],
              modules: new FormArray([])
            });
            this.onAddField()
          } else if(this.function_type == "I-Inquire"){
            let params = new HttpParams()
            .set('role',this.names);
            this.subscription = this.privilegeService.getPrivileges(params).subscribe(res=>{
              this.respData = res;
              this.formData = this.fb.group({
                name: [this.names],
                modules: new FormArray([])
              });
              let modules = this.respData.modules;
              for (var i=0; i < modules.length; i++) {
                this.onAddExistField(modules[i])
             }
            })
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
          this.subscription = this.privilegeService.createPrivilege(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigateByUrl("superuser/manage/preveleges/maintenance")
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
          this.subscription = this.privilegeService.updatePrivilege(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigateByUrl("superuser/manage/preveleges/maintenance")
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