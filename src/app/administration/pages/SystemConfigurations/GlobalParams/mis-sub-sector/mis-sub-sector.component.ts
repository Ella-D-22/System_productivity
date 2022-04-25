import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MisSubSectorService } from './mis-sub-sector.service';

@Component({
  selector: 'app-mis-sub-sector',
  templateUrl: './mis-sub-sector.component.html',
  styleUrls: ['./mis-sub-sector.component.scss']
})
export class MisSubSectorComponent implements OnInit {
function_type:any
subSectorId:any;
results:any
error:any
miscode:any
missubcode:any;
subSectorCode:any
sectorID:any
subscription:Subscription

horizontalPosition:MatSnackBarHorizontalPosition
verticalPosition:MatSnackBarVerticalPosition
message :any;
submitted = false
isDeleted = false
isEnabled = false;
  constructor(private fb:FormBuilder,
    private subSectorApi:MisSubSectorService,
    private _snackbar:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
    this.redirectToMaintence()
    this.getPage()
  }

   formData = this.fb.group({
    deleteFlag:[''],
    deletedBy: [''],
    deletedTime:[''],
    id: [''],
    mis_sub_sector: [''],
    mis_sub_sector_desc: [''],
    missubcode:[''],
    missector_id:[''],
    modifiedBy: [''],
    modifiedTime: [''],
    postedBy: [''],
    postedFlag: [''],
    postedTime: [''],
    verifiedBy: [''],
    verifiedFlag: [''],
    verifiedTime:['']
   })


    // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
  auth_user = "nobody"


  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }
 
  disabledFormControl(){
    this.formData.disable()
  }
 
 
  redirectToMaintence(){
    this.subscription = this.subSectorApi.currentMessage.subscribe(
      message =>{
        this.message = message;
        if(this.message == 'default message'){
          this.router.navigate(["system/configurations/global/mis-sector/maintenance"],{skipLocationChange:true})
        }else{
          null;
        }
      }
    )
 
  }


getPage(){
  this.subscription = this.subSectorApi.currentMessage.subscribe(
    message =>{
      this.message = message
      console.log("results",this.message);
      
      this.function_type = this.message.function_type
      this.subSectorId = this.message.id
      this.missubcode = this.message.missubcode
      this.miscode = this.message.miscode
      this.sectorID = this.message.missector_id
      if(this.function_type == "A-Add"){
        this.isEnabled = true;
        this.formData = this.fb.group({
          deleteFlag:['N'],
          deletedBy: ['N'],
          deletedTime:[new Date()],
          // id: [''],
          mis_sub_sector: [''],
          missubcode:[''],
          missector_id:[this.sectorID],
          mis_sub_sector_desc: [''],
          modifiedBy: ['Nobody'],
          modifiedTime: [new Date()],
          postedBy: [this.auth_user],
          postedFlag: ['Y'],
          postedTime: [new Date()],
          verifiedBy: ['Nobody'],
          verifiedFlag: ['N'],
          verifiedTime:[new Date()]

        })
      } else if(this.function_type == "I-Inquire"){
      console.log("MS SUBCODE", this.missubcode);
          this.isEnabled = true;
        this.disabledFormControl()
       this.subscription = this.subSectorApi.getSubSectorByCode(this.missubcode).subscribe(
         res =>{
           this.results = res
           console.log("hello");
           
           console.log("RESPOND", res);
           this.subSectorId = this.results.id
           this.formData = this.fb.group({
            deleteFlag:[this.results.deleteFlag],
            deletedBy: [this.results.deletedBy],
            deletedTime:[this.results.deletedTime],
            id: [this.results.id],
            mis_sub_sector: [this.results.mis_sub_sector],
            missubcode:[this.results.missubcode],
            missector_id:[this.sectorID],
            mis_sub_sector_desc: [this.results.mis_sub_sector_desc],
            modifiedBy: [this.results.modifiedBy],
            modifiedTime: [this.results.modifiedTime],
            postedBy: [this.results.postedBy],
            postedFlag: [this.results.postedFlag],
            postedTime: [this.results.postedTime],
            verifiedBy: [this.results.verifiedBy],
            verifiedFlag: [this.results.verifiedFlag],
            verifiedTime:[this.results.verifiedTime]
           })
         },
         err =>{
          this.router.navigate(["system/configurations/global/mis-sub-sector/maintenance"],{skipLocationChange:true})
          this.error =err;
          this._snackbar.open(this.error, "Try Again", {
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['red-sackbar', 'login-snackbar'],
          });
        }
       )
      }else if(this.function_type == "M-Modify"){
        this.isEnabled = true
        this.subscription = this.subSectorApi.getSubSectorByCode(this.missubcode).subscribe(
          res =>{
            this.results = res
            this.subSectorId = this.results.id
            this.formData = this.fb.group({
              deleteFlag:[this.results.deleteFlag],
              deletedBy: [this.results.deletedBy],
              deletedTime:[this.results.deletedTime],
              id: [this.results.id],
              mis_sub_sector: [this.results.mis_sub_sector],
              missubcode:[this.results.missubcode],
              missector_id:[this.sectorID],
              mis_sub_sector_desc: [this.results.mis_sub_sector_desc],
              modifiedBy: [this.auth_user],
              modifiedTime: [new Date()],
              postedBy: [this.results.postedBy],
              postedFlag: [this.results.postedFlag],
              postedTime: [this.results.postedTime],
              verifiedBy: [this.results.verifiedBy],
              verifiedFlag: [this.results.verifiedFlag],
              verifiedTime:[this.results.verifiedTime]
            })
          },
          err =>{
            this.router.navigate(["system/configurations/global/mis-sub-sector/maintenance"], {skipLocationChange:true})
            this.error =err;
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-sackbar', 'login-snackbar'],
            });
          }
        )
      } else if(this.function_type == "V-Verify"){

      }else if(this.function_type == "X-Delete"){
        this.disabledFormControl()
         this.isDeleted = true;
        this.subscription = this.subSectorApi.getSubSectorByCode(this.missubcode).subscribe(
          res =>{
            this.results = res
             console.log("Deleted", res);
             
            this.formData = this.fb.group({
              deleteFlag:['Y'],
              deletedBy: [this.auth_user],
              deletedTime:[new Date()],
              id: [this.results.id],
              mis_sub_sector: [this.results.mis_sub_sector],
              missubcode:[this.results.missubcode],
              missector_id:[this.sectorID],
              mis_sub_sector_desc: [this.results.mis_sub_sector_desc],
              modifiedBy: [this.results.modifiedBy],
              modifiedTime: [this.results.modifiedTime],
              postedBy: [this.results.postedBy],
              postedFlag: [this.results.postedFlag],
              postedTime: [this.results.postedTime],
              verifiedBy: [this.results.verifiedBy],
              verifiedFlag: [this.results.verifiedFlag],
              verifiedTime:[this.results.verifiedTime]
            });

          },
          err =>{          
            this.error = err;
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-sackbar', 'login-snackbar'],
            });
          })
      }
    })
  }

onSubmit(){
  this.submitted = true;
  if(this.formData.valid){
    if(this.function_type == "A-Add"){
      this.subscription = this.subSectorApi.createSubSector(this.formData.value).subscribe(
        res =>{
          this.results = res;
          this._snackbar.open("Executed Successfully!", "X", {
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['green-snackbar', 'login-snackbar']
          });
          this.router.navigate(["system/configurations/global/mis-sub-sector/maintenance"], {skipLocationChange:true})
         }, 
        err =>{
          this.error = err
          this._snackbar.open(this.error,"Try Again",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['red-snackbar', 'login-snackbar']
          })
        }
      )
    } else if(this.function_type == "M-Modify"){
      this.subscription = this.subSectorApi.updateSubSector(this.formData.value).subscribe(
        res =>{
          this.results = res
          this._snackbar.open("Executed Successfully","X",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['green-snackbar', 'login-snackbar']

          });
          this.router.navigate(["system/configurations/global/mis-sub-sector/maintenance"], {skipLocationChange:true})
        }, 
        err =>{
          this.error = err
          this._snackbar.open(this.error, "Try Again",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['red-snackbar', 'login-snackbar']
          })
        }
      )    

    }else if(this.function_type == "X-Delete"){
      this.subscription = this.subSectorApi.updateSubSector(this.formData.value).subscribe(
        res =>{
          this.results = res
          this._snackbar.open("Record Deleted Successfully","X",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['green-snackbar', 'login-snackbar']

          });
          this.router.navigate(["system/configurations/global/mis-sub-sector/maintenance"], {skipLocationChange:true})
        }, 
        err =>{
          this.error = err
          this._snackbar.open(this.error, "Try Again",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['red-snackbar', 'login-snackbar']
          })
        }
      )
    }
  } else{
    
    this._snackbar.open("Invalid Form Data Value", "Try Again",{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:3000,
      panelClass:['red-snackbar','login-snackbar']
    })
  }
  
 }
}
