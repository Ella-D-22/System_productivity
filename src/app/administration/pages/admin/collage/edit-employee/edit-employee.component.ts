import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/administration/Service/SystemConfigs/Organisation/organization.service';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  empNameArray: any[] = [];
  hide = true;
  employeeData: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: OrganizationService,

    public dialogRef: MatDialogRef<AdminComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.employeeData = data.data;
  }

  ngOnInit(): void {
    this.createEmployeeForm();
    this.getAllEmployees();
  }


  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      id: [this.employeeData.id, Validators.required],
      firstName: [this.employeeData.firstName, Validators.required],
      lastName: [this.employeeData.lastName, Validators.required],
      email: [this.employeeData.email, Validators.required],
      appUserRole: [this.employeeData.appUserRole, Validators.required],
      designation: [this.employeeData.designation, Validators.required],
      password: [this.employeeData.password, Validators.required],
    });
  }
  getAllEmployees() {
    this.api.get().subscribe({
      next: (res) => {
        this.empNameArray = res;
      },
      error: (err) => {
        alert('Could not fetch data');
      },
    });
  }

  addEmployee() {
    console.log(this.employeeForm.value);

    this.api
      .update(this.employeeForm.value, 
        this.employeeForm.value.id)
      .subscribe({
        next: (res) => {
          alert('Employee updated succesfully');
           
          this.dialogRef.close();
          this.employeeData.reset();
          
        },error: () => {
          alert('Employee updated succesfully!');
        },
      });
    // if (this.employeeForm.valid) {
    // }
  }
}
