import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/administration/Service/SystemConfigs/Organisation/organization.service';
import { ViewReportsComponent } from '../../view-reports.component';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
})
export class EditReportComponent implements OnInit {
  reportForm: FormGroup;
  userNameArray: any[] = [];
  reportData: any;

  constructor(
    private formBuilder: FormBuilder,
    private Api: OrganizationService,
    public dialogRef: MatDialogRef<ViewReportsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.reportData = data.data;
  }

  ngOnInit(): void {
    this.createReportForm();
    this.getAllUsernames();
    console.log('reportData: ', this.reportData.email);
  }
  createReportForm() {
    this.reportForm = this.formBuilder.group({
      id: [this.reportData.id, Validators.required],
      email: [this.reportData.email, Validators.required],
      creationDate: [this.reportData.creationDate, Validators.required],
      departmentEnum: [this.reportData.departmentEnum, Validators.required],
      reportCategory: [this.reportData.reportCategory, Validators.required],
      ticketId: [this.reportData.ticketId, Validators.required],
      timeTaken: [this.reportData.timeTaken, Validators.required],
      clientNameEnum: [this.reportData.clientNameEnum, Validators.required],
      productNameEnum: [this.reportData.productNameEnum, Validators.required],
      report_description: [
        this.reportData.report_description,
        Validators.required,
      ],
    });
  }

  getAllUsernames() {
    // this.Api.get()

    this.Api.get().subscribe({
      next: (res) => {
        this.userNameArray = res;
        //
        console.log('this.userNameArray ', this.userNameArray);
      },
      // error: (err)=>{
      //   alert("Could not fetch Data");
      // }
    });
  }

  onSubmit() {
    console.log(this.reportForm.value);

    this.Api.updateReport(
      this.reportForm.value,
      this.reportForm.value.id
    ).subscribe({
      next: (res) => {
        alert('Report updated successfully!');
        this.dialogRef.close('update');
        this.reportForm.reset();
        
      },
      error: () => {
        alert('Error in updating records!');
      },
    });
    //   if (this.reportForm.valid){
    // }
  }
}
