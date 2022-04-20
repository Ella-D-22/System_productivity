import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSegmentService } from '../sub-segment.service';

@Component({
  selector: 'app-sub-segment',
  templateUrl: './sub-segment.component.html',
  styleUrls: ['./sub-segment.component.scss']
})
export class SubSegmentComponent implements OnInit {
  isEnabled = false
  isDeleted = false
  function_type: any
  segment_id: any
  subSegment_id: any
  subSegment_code: any
  segment_code: any
  results: any
  error: any
  message: any
  subscription: Subscription
  horizontalPosition: MatSnackBarHorizontalPosition
  verticalPosition: MatSnackBarVerticalPosition
  constructor(private router: Router,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private subSegmentService: SubSegmentService) { }

  ngOnInit(): void {
    this.getPage()
  }

  formData = this.fb.group({
    segment_id:[''],
    subSegmentCode: [''],
    subSegmentDescription: [''],
    deleteFlag: [''],
    deletedTime: [''],
    deletedBy: [''],
    verifiedBy: [''],
    verifiedTime: [''],
    verifiedFlag: [''],
    postedFlag: [''],
    postedBy: [''],
    postedTime: [''],
    modifiedBy: [''],
    modifiedTime: [''],
    modifiedFlag: [''],
    id: ['']
  })
  get f() { return this.formData.controls; }
  auth_user = "nobody"

  disabledFormControl() {
    this.formData.disable()
  }

  getPage() {
    this.subscription = this.subSegmentService.currentMessage.subscribe(
      message => {
        this.message = message
        console.log(this.message);
        
        this.function_type = this.message.function_type
        this.subSegment_code = this.message.subSegmentCode
        this.segment_code = this.message.segmentCode
        this.segment_id = this.message.segment_id

        if (this.function_type == "A-Add") {
          this.isEnabled = true;

          this.formData = this.fb.group({
            segment_id:[this.segment_id],
            subSegmentCode: [''],
            subSegmentDescription: [''],
            deleteFlag: ['N'],
            deletedTime: [new Date],
            deletedBy: ['user'],
            verifiedBy: ['user'],
            verifiedTime: [new Date()],
            verifiedFlag: ['N'],
            postedFlag: ['Y'],
            postedBy: ['user'],
            postedTime: [new Date()],
            modifiedBy: ['user'],
            modifiedTime: [new Date()],
            modifiedFlag: ['N']

          })
        } else if (this.function_type == "I-Inquire") {
          this.disabledFormControl()
          this.subscription = this.subSegmentService.getSubSectorByCode(this.subSegment_code).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                segment_id:[this.results.segment_id],
                subSegmentCode: [this.results.subSegmentCode],
                subSegmentDescription: [this.results.subSegmentDescription],
                deleteFlag: [this.results.deleteFlag],
                deletedTime: [this.results.deletedTime],
                deletedBy: [this.results.deletedBy],
                verifiedBy: [this.results.verifiedBy],
                verifiedTime: [this.results.verifiedTime],
                verifiedFlag: [this.results.verifiedFlag],
                postedFlag: [this.results.postedFlag],
                postedBy: [this.results.postedBy],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                modifiedFlag:[this.results.modifiedFlag],
                id: [this.results.id]
              })
            }
          )
        } else if (this.function_type == "M-Modify") {
          this.isEnabled = true
          this.subscription = this.subSegmentService.getSubSectorByCode(this.subSegment_code).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                segment_id:[this.results.segment_id],
                subSegmentCode: [this.results.subSegmentCode],
                subSegmentDescription: [this.results.subSegmentDescription],
                deleteFlag: [this.results.deleteFlag],
                deletedTime: [this.results.deletedTime],
                deletedBy: [this.results.deletedBy],
                verifiedBy: [this.results.verifiedBy],
                verifiedTime: [this.results.verifiedTime],
                verifiedFlag: [this.results.verifiedFlag],
                postedFlag: [this.results.postedFlag],
                postedBy: [this.results.postedBy],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [new Date()],
                modifiedFlag:["Y"],
                id: [this.results.id]
              })
            }
          )
        } else if (this.function_type == "X-Delete") {
          this.isDeleted = true;
          this.disabledFormControl()
          this.subscription = this.subSegmentService.getSubSectorByCode(this.subSegment_code).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                segment_id:[this.results.segment_id],
                subSegmentCode: [this.results.subSegmentCode],
                subSegmentDescription: [this.results.subSegmentDescription],
                deleteFlag: ["Y"],
                deletedTime: [new Date()],
                deletedBy: [this.results.deletedBy],
                verifiedBy: [this.results.verifiedBy],
                verifiedTime: [this.results.verifiedTime],
                verifiedFlag: [this.results.verifiedFlag],
                postedFlag: [this.results.postedFlag],
                postedBy: [this.results.postedBy],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                modifiedFlag:[this.results.modifiedFlag],

                id: [this.results.id]
              })
            }
          )
        } else if (this.function_type == "V-Verify") {
          this.disabledFormControl()
          this.isEnabled = true;
          this.subscription = this.subSegmentService.getSubSectorByCode(this.subSegment_code).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                segment_id:[this.results.segment_id],
                subSegmentCode: [this.results.subSegmentCode],
                subSegmentDescription: [this.results.subSegmentDescription],
                deleteFlag: [this.results.deleteFlag],
                deletedTime: [this.results.deletedTime],
                deletedBy: [this.results.deletedBy],
                verifiedBy: [this.results.verifiedBy],
                verifiedTime: [this.results.verifiedTime],
                verifiedFlag: [this.results.verifiedFlag],
                postedFlag: [this.results.postedFlag],
                postedBy: [this.results.postedBy],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                modifiedFlag:[this.results.modifiedFlag],
                id: [this.results.id]
              })
            }
          )
        }
      }
    )

  }
  onSubmit() {

    if (this.formData.valid) {
      if (this.function_type == "A-Add") {
        this.subscription = this.subSegmentService.createSubSegment(this.formData.value).subscribe(
          res => {
            this.results = res
            this._snackbar.open("Executed Successfully", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar']
            });
            this.router.navigate(['/system/configurations/global/sub-segment/maintenance'], { skipLocationChange: true })
          },
          err => {
            this.error = err
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar']
            });
            this.router.navigate(['/system/configurations/global/sub-segment/maintenance'], { skipLocationChange: true })

          }
        )
      } else if (this.function_type != "A-Add") {
        this.subscription = this.subSegmentService.updateSubSegment(this.formData.value).subscribe(
          res => {
            this.results = res
            this._snackbar.open("Executed Successfully", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar']
            });
            this.router.navigate(['/system/configurations/global/sub-segment/maintenance'], { skipLocationChange: true })
          },
          err => {
            this.error = err
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar']
            });
            this.router.navigate(['/system/configurations/global/sub-segment/maintenance'], { skipLocationChange: true })

          }
        )

      }
    }
  }

}
