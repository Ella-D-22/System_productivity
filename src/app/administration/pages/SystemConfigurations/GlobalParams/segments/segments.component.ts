import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SegmentsService } from './segments.service';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {

  subscription:Subscription
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  message: any;
  function_type:any
  segment_id:any
  segment_code:any
  results:any
  error:any
  isEnabled = false;
  isDeleted = false;
  constructor(private fb: FormBuilder,
    private _snackbar:MatSnackBar,
    private segService:SegmentsService,
    private router:Router) { }

  ngOnInit(): void {
    this.getPage()
    this.redirectToMaintence()
  }
   // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
  auth_user = "nobody"

  formData =  this.fb.group({
    segmentCode: [''],
    segmentDescription: [''],
    deleteFlag:[''],
    deletedTime:[''],
    deletedBy:[''],
    verifiedBy:[''],
    verifiedTime:[''],
    verifiedFlag:[''],
    postedFlag:[''],
    postedBy:[''],
    postedTime:[''],
    modifiedBy:[''],
    modifiedTime:[''],
    modifiedFlag:[''],
    id:['']
    
    })
    disabledFormControl(){
      this.formData.disable()
    }

    redirectToMaintence(){
      this.subscription = this.segService.currentMessage.subscribe(
        message =>{
          this.message = message;
          if(this.message == 'default message'){
            this.router.navigate(['system/configurations/global/segment/maintenance'], {skipLocationChange:true})
          }else{
            null;
          }
        }
      )
   
    }
    getPage(){
      this.subscription = this.segService.currentMessage.subscribe(
        message =>{
          this.message = message;
          this.function_type = this.message.function_type
          this.segment_code = this.message.segmentCode

          if(this.function_type == "A-Add"){
           this.isEnabled = true;
            this.formData = this.fb.group({
              segmentCode: [''],
              segmentDescription: [''],
              deleteFlag:['N'],
              deletedTime:[new Date()],
              deletedBy:['user'],
              verifiedBy:['user'],
              verifiedTime:[new Date()],
              verifiedFlag:['N'],
              postedFlag:["Y"],
              postedBy:[this.auth_user],
              postedTime:[new Date()],
              modifiedBy:["N"],
              modifiedTime:[new Date()],
              modifiedFlag:["N"]
              
            })
          }else if(this.function_type == "I-Inquire"){
             this.disabledFormControl()
             this.subscription = this.segService.getSegmentByCode(this.segment_code).subscribe(
               res =>{
                 this.results = res
                  this.formData = this.fb.group({
                    segmentCode: [this.results.segmentCode],
                    segmentDescription: [this.results.segmentDescription],
                    deleteFlag:[this.results.deleteFlag],
                    deletedTime:[this.results.deletedTime],
                    deletedBy:[this.results.deletedBy],
                    verifiedBy:[this.results.verifiedBy],
                    verifiedTime:[this.results.verifiedTime],
                    verifiedFlag:[this.results.verifiedFlag],
                    postedFlag:[this.results.postedFlag],
                    postedBy:[this.results.postedBy],
                    postedTime:[this.results.postedTime],
                    modifiedBy:[this.results.modifiedBy],
                    modifiedTime:[this.results.modifiedTime],
                    modifiedFlag:[this.results.modifiedFlag],
                    id:[this.results.id]
                  })
               }
             )
          }else if(this.function_type == "M-Modify"){
            this.isEnabled = true;
            this.subscription = this.segService.getSegmentByCode(this.segment_code).subscribe(
              res =>{
                this.results = res
                this.formData = this.fb.group({
                  segmentCode: [this.results.segmentCode],
                  segmentDescription: [this.results.segmentDescription],
                  deleteFlag:[this.results.deleteFlag],
                  deletedTime:[this.results.deletedTime],
                  deletedBy:[this.results.deletedBy],
                  verifiedBy:[this.results.verifiedBy],
                  verifiedTime:[this.results.verifiedTime],
                  verifiedFlag:[this.results.verifiedFlag],
                  postedFlag:[this.results.postedFlag],
                  postedBy:[this.results.postedBy],
                  postedTime:[this.results.postedTime],
                  modifiedBy:[this.auth_user],
                  modifiedTime:[new Date()],
                  modifiedFlag:["Y"],
                  id:[this.results.id]
                })
              }
            )
          }else if(this.function_type == "X-Delete"){
            this.isDeleted = true;
            this.disabledFormControl()
            this.subscription = this.segService.getSegmentByCode(this.segment_code).subscribe(
              res =>{
                this.results = res
                this.formData = this.fb.group({
                  segmentCode: [this.results.segmentCode],
                  segmentDescription: [this.results.segmentDescription],
                  deleteFlag:["Y"],
                  deletedTime:[new Date()],
                  deletedBy:[this.auth_user],
                  verifiedBy:[this.results.verifiedBy],
                  verifiedTime:[this.results.verifiedTime],
                  verifiedFlag:[this.results.verifiedFlag],
                  postedFlag:[this.results.postedFlag],
                  postedBy:[this.results.postedBy],
                  postedTime:[this.results.postedTime],
                  modifiedBy:[this.results.modifiedBy],
                  modifiedTime:[this.results.modifiedTime],
                  modifiedFlag:[this.results.modifiedFlag],
                  id:[this.results.id]
                })
              }
            )

          }else if(this.function_type == "V-Verify"){
            this.isEnabled = true;
            this.subscription = this.segService.getSegmentByCode(this.segment_code).subscribe(
              res =>{
                this.results = res
                this.formData = this.fb.group({
                  segmentCode: [this.results.segmentCode],
                  segmentDescription: [this.results.segmentDescription],
                  deleteFlag:[this.results.deleteFlag],
                  deletedTime:[this.results.deletedTime],
                  deletedBy:[this.results.deletedBy],
                  verifiedBy:[this.auth_user],
                  verifiedTime:[new Date()],
                  verifiedFlag:["Y"],
                  postedFlag:[this.results.postedFlag],
                  postedBy:[this.results.postedBy],
                  postedTime:[this.results.postedTime],
                  modifiedBy:[this.results.modifiedBy],
                  modifiedTime:[this.results.modifiedTime],
                  modifiedFlag:[this.results.modifiedFlag],
                  id:[this.results.id]

                })
              } ) }
        } )

    }
  onSubmit() {
      console.log("Add segment values", this.formData.value);
      
      if(this.formData.valid){
        if(this.function_type == "A-Add"){
          this.subscription = this.segService.createSegment(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully!", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
              });
              this.router.navigate(['/system/configurations/global/segment/maintenance'], {skipLocationChange:true})
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              });
              this.router.navigate(['/system/configurations/global/segment/maintenance'], {skipLocationChange:true})

            }
          )
        }else if( this.function_type != "A-Add"){
           this.subscription = this.segService.updateSegment(this.formData.value).subscribe(
             res =>{
               this.results = res
               this._snackbar.open("Executed Successfully", "X", {
                 horizontalPosition:this.horizontalPosition,
                 verticalPosition:this.verticalPosition,
                 duration:3000,
                 panelClass:['red-snackbar', 'login-snackbar']
               });
               this.router.navigate(['/system/configurations/global/segment/maintenance'], {skipLocationChange:true})
             },
             err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              });
              this.router.navigate(['/system/configurations/global/segment/maintenance'], {skipLocationChange:true})
             }
           )
        }
      }

    }
}
