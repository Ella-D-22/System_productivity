import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainClassificationService } from './main-classification.service';


@Component({
  selector: 'app-main-classifications',
  templateUrl: './main-classifications.component.html',
  styleUrls: ['./main-classifications.component.scss']
})
export class MainClassificationsComponent implements OnInit {
 

  message:any
  results:any
  error:any
  function_type:any
  main_code:any
  isEnabled = false
  isDeleted = false
  submitted = false
  subscription:Subscription
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  constructor(private fb:FormBuilder,
    private mainService:MainClassificationService,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    this.getPage()
  }

  formData = this.fb.group({
    mainClassificationCode: [''],
    mainClassificationDescription: [''],
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

  getPage(){
    this.subscription = this.mainService.currentMessage.subscribe(
      message =>{
        this.message = message
        this.function_type = this.message.function_type
        this.main_code = this.message.main_classification_code

        if(this.function_type == "A-Add"){
          this.isEnabled = true;
          this.formData = this.fb.group({
            mainClassificationCode: [''],
            mainClassificationDescription: [''],
            deleteFlag:['N'],
            deletedTime:[new Date()],
            deletedBy:['None'],
            verifiedBy:['None'],
            verifiedTime:[new Date()],
            verifiedFlag:['N'],
            postedFlag:['Y'],
            postedBy:['User'],
            postedTime:[new Date()],
            modifiedBy:['None'],
            modifiedTime:[new Date()],
            modifiedFlag:['N'],
            id:['']
          })
        } else if(this.function_type == "I-Inquire"){
          this.disabledFormControl()

          this.subscription = this.mainService.getMainClassificationByCode(this.main_code).subscribe(
            res =>{
              this.results = res

              this.formData = this.fb.group({
                mainClassificationCode: [this.results.mainClassificationCode],
                mainClassificationDescription: [this.results.mainClassificationDescription],
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
          this.isEnabled = true
          this.subscription = this.mainService.getMainClassificationByCode(this.main_code).subscribe(
            res =>{
              this.results = res
              
              this.formData = this.fb.group({
                mainClassificationCode: [this.results.mainClassificationCode],
                mainClassificationDescription: [this.results.mainClassificationDescription],
                deleteFlag:[this.results.deletedFlag],
                deletedTime:[this.results.deletedTime],
                deletedBy:[this.results.deletedBy],
                verifiedBy:[this.results.verifiedBy],
                verifiedTime:[this.results.verifiedTime],
                verifiedFlag:[this.results.verifiedFlag],
                postedFlag:[this.results.postedFlag],
                postedBy:[this.results.postedBy],
                postedTime:[this.results.postedTime],
                modifiedBy:["User"],
                modifiedTime:[new Date()],
                modifiedFlag:["Y"],
                id:[this.results.id]
              })
            }
          )
        }else if(this.function_type == "X-Delete"){
          this.isDeleted = true
          this.disabledFormControl()
          this.subscription = this.mainService.getMainClassificationByCode(this.main_code).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                mainClassificationCode: [this.results.mainClassificationCode],
                mainClassificationDescription: [this.results.mainClassificationDescription],
                deleteFlag:["Y"],
                deletedTime:[new Date()],
                deletedBy:['user'],
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
          this.subscription == this.mainService.getMainClassificationByCode(this.main_code).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                mainClassificationCode: [this.results.mainClassificationCode],
                mainClassificationDescription: [this.results.mainClassificationDescription],
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
            }
          )
        }
      }
    )
  }

  onSubmit(){

    this.submitted = true;
    if(this.formData.valid){
      if(this.function_type == "A-Add"){
        this.subscription = this.mainService.createMainClassification(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Created Main Classification Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'red-login']
            });
            this.router.navigate(['/system/configurations/global/main-classification/maintenance'], {skipLocationChange:true})
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              });
              this.router.navigate(['/system/configurations/global/main-classification/maintenance'], {skipLocationChange:true})

            }
        )
      }else if(this.function_type != "A-Add"){
        this.subscription = this.mainService.updateMainClassification(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Updated Main Classification Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'red-login']
            });
            this.router.navigate(['/system/configurations/global/main-classification/maintenance'], {skipLocationChange:true})
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              });
              this.router.navigate(['/system/configurations/global/main-classification/maintenance'], {skipLocationChange:true})

            }
        )
      }
    }
  }
}
