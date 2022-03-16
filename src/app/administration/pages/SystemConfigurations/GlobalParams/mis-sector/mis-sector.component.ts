import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MisSectorService } from './mis-sector.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-sector',
  templateUrl: './mis-sector.component.html',
  styleUrls: ['./mis-sector.component.scss']
})
export class MisSectorComponent implements OnInit {
miscode:any;
function_type:any;
subscription!:Subscription;
message:any;
miscode_id:any;
results:any
error:any;
horizontalPosition:MatSnackBarHorizontalPosition;
verticalPosition:MatSnackBarVerticalPosition

  constructor(private fb:FormBuilder,
    private SectorAPi:MisSectorService,
    private _snackbar:MatSnackBar,
    private router:Router) { }
submitted=false;
loading=false;
isEnabled:any;
  ngOnInit(): void {
    this.redirectToMaintence()
    this.getPage()
  }
  currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  auth_user = this.currentUser.username;


  formData =  this.fb.group({
  deleteFlag: [''],
  deletedBy: [''],
  deletedTime: [''],
  id: [''],
  mis_sector: [''],
  mis_sector_desc: [''],
  miscode:[''],
  modifiedBy: [''],
  modifiedTime:[''],
  postedBy:[''],
  postedFlag: [''],
  postedTime: [''],
  verifiedBy: [''],
  verifiedFlag: [''],
  verifiedTime: ['']
  })
 disabledFunctionDataValue(){
   this.formData.controls.value.disable()
 }


 redirectToMaintence(){
   this.subscription = this.SectorAPi.currentMessage.subscribe(
     message =>{
       this.message = message;
       if(this.message == 'default message'){
         this.router.navigateByUrl("system/configurations/global/mis-sector/maintenance")
       }else{
         null;
       }
     }
   )

 }
getPage(){
  this.subscription = this.SectorAPi.currentMessage.subscribe(
    message =>{
      this.message = message;
      this.function_type = this.message.function_type;
      this.miscode = this.message.miscode;
      this.miscode_id = this.message.id

      if(this.function_type == "A-Add"){
       
        this.formData = this.fb.group({
          id:[''],
          miscode:[''],
          mis_sector:[''],
          mis_sector_desc:[''],
          deletedFlag:[''],
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
        
        });
      } else if(this.function_type == "I-Inquire"){
        this.disabledFunctionDataValue()

        this.subscription = this.SectorAPi.getMisSectorId(this.miscode_id).subscribe(
          res =>{
            this.results = res
            this.miscode = this.results.miscode
            this.formData = this.fb.group({
              id:[this.results.id],
              miscode:[this.results.miscode],
              mis_sector:[this.results.mis_sector],
              mis_sector_desc:[this.results.mis_sector_desc],
              deletedFlag:[''],
              deletedTime:[''],
              deletedBy:[''],
              verifiedBy:[''],
              verifiedTime:[''],
              verifiedFlag:[''],
              postedFlag:[this.results.postedFlag],
              postedBy:[this.results.postedBy],
              postedTime:[this.results.postedTime],
              modifiedBy:[''],
              modifiedTime:[''],
            
            });
          }, 
          err =>{
            this.router.navigateByUrl("system/configurations/global/mis-sub-sector/maintenance")
            this.error =err;
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-sackbar', 'login-snackbar'],
            });
          })
      }else if(this.function_type == "M-Modify"){

        this.subscription = this.SectorAPi.getMisSectorId(this.miscode_id).subscribe(
          res =>{
            this.results = res;
            this.formData = this.fb.group({
              id:[this.results.id],
              miscode:[this.results.miscode],
              mis_sector:[this.results.mis_sector],
              mis_sector_desc:[this.results.mis_sector_desc],
              deletedFlag:[''],
              deletedTime:[''],
              deletedBy:[''],
              verifiedBy:[''],
              verifiedTime:[''],
              verifiedFlag:[''],
              postedFlag:[this.results.postedFlag],
              postedBy:[this.results.postedBy],
              postedTime:[this.results.postedTime],
              modifiedBy:[''],
              modifiedTime:[''],
            
            });
            

          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['login-snackBar']
            })
     
          })

      } else if(this.function_type == "V-Verified"){

      }else if(this.function_type == "X-Delete"){
        this.disabledFunctionDataValue()
        this.subscription = this.SectorAPi.getMisSectorId(this.miscode_id).subscribe(
          res =>{
            this.results = res
            this.miscode = this.results.miscode
            this.formData = this.fb.group({
              id:[this.results.id],
              miscode:[this.results.miscode],
              mis_sector:[this.results.mis_sector],
              mis_sector_desc:[this.results.mis_sector_desc],
              deletedFlag:[''],
              deletedTime:[''],
              deletedBy:[''],
              verifiedBy:[''],
              verifiedTime:[''],
              verifiedFlag:[''],
              postedFlag:[this.results.postedFlag],
              postedBy:[this.results.postedBy],
              postedTime:[this.results.postedTime],
              modifiedBy:[''],
              modifiedTime:[''],
            
            });
          }, 
          err =>{
            this.router.navigateByUrl("system/configurations/global/mis-sub-sector/maintenance")
            this.error =err;
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
   // convenience getter for easy access to form fields
   get f() { return this.formData.controls; }
onSubmit(){
   this.submitted = true;
   if(this.formData.valid){
     if(this.function_type == "A-Add"){
       this.subscription = this.SectorAPi.createMisSector(this.formData.value).subscribe(
         res =>{
           this.results = res;
           this._snackbar.open("Executed Successfully!", "X", {
             horizontalPosition:this.horizontalPosition,
             verticalPosition:this.verticalPosition,
             duration:3000,
             panelClass:['green-snackbar', 'login-snackbar']
           });
           this.router.navigateByUrl("system/configurations/global/mis-sector/maintenance")
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
       this.subscription = this.SectorAPi.updateMisSector(this.miscode_id,this.formData.value).subscribe(
         res =>{
           this.results = res
           this._snackbar.open("Executed Successfully","X",{
             horizontalPosition:this.horizontalPosition,
             verticalPosition:this.verticalPosition,
             duration:3000,
             panelClass:['green-snackbar', 'login-snackbar']

           });
           this.router.navigateByUrl("system/configurations/global/mis-sector/maintenance")
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

     }else if(this.function_type == "X-Delete"){}
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
