import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubClassificationService } from './sub-classification.service';

@Component({
  selector: 'app-sub-classifications',
  templateUrl: './sub-classifications.component.html',
  styleUrls: ['./sub-classifications.component.scss']
})
export class SubClassificationsComponent implements OnInit {
  // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
  auth_user = "kiprotich"

  message:any
  results:any
  error:any
  function_type:any
  sub_code:any
  main_code:any
  main_id:any
  isEnabled = false
  isDeleted = false
  submitted = false
  subscription:Subscription
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private fb:FormBuilder,
    private subService:SubClassificationService,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    this.getPage()
  }
  formData = this.fb.group({
    subClassificationCode: [''],
    subClassificationDesc: [''],
    main_id:[''],
    deleteFlag:[''],
    deletedTime:[''],
    deletedBy:[''],
    verifiedBy:[''],
    verifiedTime:[''],
    verifiedFlag:[''],
    postedFlag:[this.auth_user],
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
  getPage(){
    this.subscription = this.subService.currentMessage.subscribe(
      message =>{
        this.message = message
        this.function_type = this.message.function_type
        this.sub_code = this.message.sub_classification_code
        this.main_code = this.message.main_classification_code
        this.main_id = this.message.main_id
        if(this.function_type == "A-Add"){
          this.isEnabled = true;
          this.formData = this.fb.group({
            main_id:[this.main_id],
            subClassificationCode: [''],
            subClassificationDesc: [''],
            deleteFlag:['N'],
            deletedTime:[new Date()],
            deletedBy:['None'],
            verifiedBy:['None'],
            verifiedTime:[new Date()],
            verifiedFlag:['N'],
            postedFlag:['Y'],
            postedBy:[this.auth_user],
            postedTime:[new Date()],
            modifiedBy:['None'],
            modifiedTime:[new Date()],
            modifiedFlag:['N'],
          })
        } else if(this.function_type == "I-Inquire"){
          this.disabledFormControl()
          this.subscription = this.subService.getSubClassificationByCode(this.sub_code).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                main_id:[this.main_id],
                subClassificationCode: [this.results.subClassificationCode],
                subClassificationDesc: [this.results.subClassificationDesc],
                deleteFlag:[this.results.deletedFlag],
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
          this.subscription = this.subService.getSubClassificationByCode(this.sub_code).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                main_id:[this.main_id],
                subClassificationCode: [this.results.subClassificationCode],
                subClassificationDesc: [this.results.subClassificationDesc],
                deleteFlag:[this.results.deletedFlag],
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
          this.isDeleted = true
          this.disabledFormControl()
          this.subscription = this.subService.getSubClassificationByCode(this.sub_code).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                main_id:[this.main_id],
                subClassificationCode: [this.results.subClassificationCode],
                subClassificationDesc: [this.results.subClassificationDesc],
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
          this.subscription == this.subService.getSubClassificationByCode(this.sub_code).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                main_id:[this.main_id],
                subClassificationCode: [this.results.subClassificationCode],
                subClassificationDesc: [this.results.subClassificationDesc],
                deleteFlag:[this.results.deletedFlag],
                deletedTime:[this.results.deletedTime],
                deletedBy:[this.results.deletedBy],
                verifiedBy:['user'],
                verifiedTime:[new Date()],
                verifiedFlag:['Y'],
                postedFlag:[this.results.postedFlag],
                postedBy:[this.results.postedBy],
                postedTime:[this.results.postedTime],
                modifiedBy:[this.results.modifiedBy],
                modifiedTime:[this.results.modifiedTime],
                modifiedFlag:[this.results.modifiedFlag],
                id:[this.results.id]
              })
            })
        }
      })
  }
  onSubmit(){
    this.submitted = true;
    if(this.formData.valid){
      if(this.function_type == "A-Add"){
        this.subscription = this.subService.createSubClassification(this.formData.value).subscribe(
          res => {
            this.results = res
            this._snackbar.open("Sub Classification created Successfully", "OK", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'red-login']
            });
            this.router.navigate(['/system/configurations/global/sub-classification/maintenance'], { skipLocationChange: true })
          },
          err => {
            this.error = err
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar']
            });
            this.router.navigate(['/system/configurations/global/sub-classification/maintenance'], { skipLocationChange: true })
          });
      }else if(this.function_type != "A-Add"){
        this.subscription = this.subService.updateSubClassification(this.formData.value).subscribe(
          res =>{
            this.results = res;
            this.results = res
            this._snackbar.open("Sub Classification Modified Successfully", "OK",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'red-login']
            });
            this.router.navigate(['/system/configurations/global/sub-classification/maintenance'], {skipLocationChange:true})
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "TRY AGAIN",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              });
              this.router.navigate(['/system/configurations/global/sub-classification/maintenance'], {
                skipLocationChange: true
              });
            })
      }
    }
  }

}
