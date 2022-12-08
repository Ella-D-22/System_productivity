import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from '../../Service/SystemConfigs/Organisation/organization.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  employeeForm !: FormGroup;
  actionButton : String= "Save";
  hide = true;

  constructor(
    
    private formBuilder : FormBuilder, 
    @Inject(MAT_DIALOG_DATA) 
    public editData: any,
    private Api : OrganizationService, 
    private matDialogRef: MatDialogRef<DialogComponent>
  ) { 
      console.log("Edit Data", editData);
      
       }
  

  ngOnInit(): void {
    
    this.employeeForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',Validators.required],
      appUserRole : ['',Validators.required],
      designation : ['',Validators.required],
      password : ['',Validators.required]
      // experience : ['',Validators.required],
      // salary : ['',Validators.required],
      // date : ['',Validators.required],
      // description : ['',Validators.required]
    });
    //console.log(this.editData);

   if(this.editData){
     this.actionButton = "Update";
    this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
    this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
    this.employeeForm.controls['email'].setValue(this.editData.email);
    this.employeeForm.controls['appUserRole'].setValue(this.editData.appUserRole);
    this.employeeForm.controls['designation'].setValue(this.editData.designation);
    this.employeeForm.controls['password'].setValue(this.editData.password);
    
    // this.employeeForm.controls['experience'].setValue(this.editData.experience);
    // this.employeeForm.controls['experience'].setValue(this.editData.experience);
    // this.employeeForm.controls['salary'].setValue(this.editData.salary);
    // this.employeeForm.controls['date'].setValue(this.editData.date);
    // this.employeeForm.controls['description'].setValue(this.editData.description);
   }
  }

  addEmployee(){
   console.log(this.employeeForm.value)

   if(!this.editData){
    if(this.employeeForm.valid){
      this.Api.create(this.employeeForm.value)
        .subscribe(
          {
        next: (res)=>{
        alert("Employee Added Successfuly!");
        // this.matDialogRef.close('Save');
        // this.matDialogRef.close('Update');
        this.employeeForm.reset();
        },
        // error: ()=>{
        //   alert("Error Occurred!")
        // }
      }
      )
    }
   } else{
    this.updateEmployee()
   }
  }
  updateEmployee(){
    this.Api.update(this.employeeForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("Employee Records Updated Successfully");
        console.log(this.employeeForm.value);
        // this.matDialogRef.close();
        this.employeeForm.reset();
      },
      error: ()=>{
        alert("Error in Updating the Details");
      },
    })
  }
}


