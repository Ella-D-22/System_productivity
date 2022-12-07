import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from '../../Service/SystemConfigs/Organisation/organization.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {date = formatDate(new Date(), 'hh:mm a', 'en-US');
  submitButton: String= 'Submit';
actionButton: String = 'View Reports';
reportForm!: FormGroup;
editData: any;
fmData = {};
userNameArray:any[]= [] ;

constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private Api:OrganizationService) { }

  ngOnInit(): void {
    this.getAllEmployees()
    this.reportForm = this.formBuilder.group({
      email: ['', Validators.required],
      creationDate: ['', Validators.required],
      departmentEnum: ['', Validators.required],
      reportCategory: ['', Validators.required],
      ticketId: ['', Validators.required],
      timeTaken: this.date,
      clientNameEnum: ['', Validators.required],
      productNameEnum: ['', Validators.required],
      report_description: ['', Validators.required],
    });
    if (this.editData) {
      this.actionButton = 'Update';
      this.reportForm.controls['email'].setValue(this.editData.email);
      this.reportForm.controls['creationDate'].setValue(
        this.editData.creationDate
      );
      this.reportForm.controls['departmentEnum'].setValue(
        this.editData.departmentEnum
      );
      this.reportForm.controls['reportCategory'].setValue(
        this.editData.reportCategory
      );
      this.reportForm.controls['ticketId'].setValue(this.editData.ticketId);
      this.reportForm.controls['timeTaken'].setValue(this.editData.timeTaken);
      this.reportForm.controls['clientNameEnum'].setValue(
        this.editData.clientNameEnum
      );
      this.reportForm.controls['productNameEnum'].setValue(
        this.editData.productNameEnum
      );
      this.reportForm.controls['report_Description'].setValue(
        this.editData.report_Description
      );
    }
  }

  onSubmit() {
    console.log(this.reportForm.value);

    this.fmData = this.reportForm.value;
    if (this.reportForm.valid) {
      this.Api.createReport(this.reportForm.value, this.reportForm.value.email).subscribe({
        next: (res) => {
          this.router.navigate([`/dash`], {

            queryParams: {
              formData: this.fmData,

            },
          });
          alert('Report added successsfully!');
          // this.matDialogRef.close('save');
          // this.matDialogRef.close('Update');
          this.reportForm.reset();
        },
        // error: () => {
        //   alert('Error occurred!');
        // },
      });
    }else{
      console.log("form not valid")
    }



  }
  updateReport() {
    this.Api.update(this.reportForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Report updated successfully!');
        console.log(this.reportForm.value);
        // this.matDialogRef.close('Update');
        this.reportForm.reset();
      },
      error: () => {
        alert('Error in updating records!');
      },
    });
  }

  getAllEmployees(){
    this.Api.get()
  
      this.Api.get()
      .subscribe({
        next : (res)=>{
          this.userNameArray = res;
          // 
          console.log("this.userNameArray ", this.userNameArray);
          
          
        },
        // error: (err)=>{
        //   alert("Could not fetch Data");
        // }
      })
      }
}


