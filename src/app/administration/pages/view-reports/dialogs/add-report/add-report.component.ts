import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/administration/Service/SystemConfigs/Organisation/organization.service';


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
    private Api: OrganizationService
  ) {}

  ngOnInit(): void {
    this.createReportForm();
    this.getAllUsernames();
  }
  createReportForm() {
    this.reportForm = this.formBuilder.group({
      email: ['', Validators.required],
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
    if (this.reportForm.valid) {
      this.Api.createReport(
        this.reportForm.value,
        this.reportForm.value.email
      ).subscribe({
        next: (res) => {
          // this.router.navigate([`../view-reports`], {
          //   queryParams: {
          //     formData: this.fmData,
          //     // this.updateReport(this.reportForm.value)
          //   },
          // });
          alert('Report added successsfully!');
          // this.matDialogRef.close('save');
          // this.matDialogRef.close('Update');
          this.reportForm.reset();
        },
        // error: () => {
        //   alert('Error occurred!');
        // },
      });
    }
  }
}
