import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/administration/Service/SystemConfigs/Organisation/organization.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewReportsComponent } from '../../view-reports.component';


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent implements OnInit {
  reportForm: FormGroup;
  userNameArray: any[] = [];
  

  constructor(
    private formBuilder: FormBuilder,
    private Api: OrganizationService,
    public dialogRef: MatDialogRef<ViewReportsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit(): void {
    this.createReportForm();
    this.getAllUsernames();
  }
  createReportForm() {
    this.reportForm = this.formBuilder.group({
      email: [''],
      creationDate: [new Date, Validators.required],
      departmentEnum: ['', Validators.required],
      reportCategory: ['', Validators.required],
      ticketId: ['', Validators.required],
      timeTaken: ['', Validators.required],
      clientNameEnum: ['', Validators.required],
       productNameEnum: ['', Validators.required],
      report_description: ['', Validators.required],
    });
  }

  getAllUsernames() {
    // this.Api.get()

    this.Api.get().subscribe({
      next: (res) => {
        this.userNameArray = res;
        
        console.log('this.userNameArray ', this.userNameArray);
      },
      // error: (err)=>{
      //   alert("Could not fetch Data");
      // }
    });
  }

  onSubmit() {
    console.log("this.reportForm.value: ",this.reportForm.value)

    this.Api.createReport(
      this.reportForm.value,
      this.reportForm.value.email
    ).subscribe({
      next: (res) => {
        
        alert('Report added successsfully!');
        this.dialogRef.close();
        this.reportForm.reset();

      }
    });
    // if (this.reportForm.valid) {
     
    // }
  }
}
