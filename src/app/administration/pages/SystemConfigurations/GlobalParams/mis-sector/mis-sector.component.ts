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
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb:FormBuilder,
    private SectorAPi:MisSectorService,
    private _snackbar:MatSnackBar,
    private router:Router) { }
submitted=false;
loading=false;
isEnabled = false;
isDeleted = false;
  ngOnInit(): void {
    this.redirectToMaintence()
    this.getPage()
  }
  // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
  auth_user = "nobody"

  disabledFormControl(){
    this.formData.disable()
  }

  formData =  this.fb.group({
  mis_sector: [''],
  mis_sector_desc: [''],
  miscode:[''],
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
  id:['']
  
  })
 disabledFunctionDataValue(){
  //  this.formData.controls.value.disable()
 }


 redirectToMaintence(){
   this.subscription = this.SectorAPi.currentMessage.subscribe(
     message =>{
       this.message = message;
       if(this.message == 'default message'){
         this.router.navigate(["system/configurations/global/mis-sector/maintenance"], {skipLocationChange:true})
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
       
      if(this.function_type == "A-Add"){
       this.isEnabled = true;
        this.formData = this.fb.group({
          miscode:[''],
          mis_sector:[''],
          mis_sector_desc:[''],
          deleteFlag:['N'],
          deletedTime:[new Date()],
          deletedBy:['N'],
          verifiedBy:['Y'],
          verifiedTime:[new Date()],
          verifiedFlag:['N'],
          postedFlag:['Y'],
          postedBy:[this.auth_user],
          postedTime:[new Date()],
          modifiedBy:['N'],
          modifiedTime:[new Date],
        
        });
      } else if(this.function_type == "I-Inquire"){
        this.disabledFormControl()
        
        
          this.isEnabled = false;  
        this.subscription = this.SectorAPi.getMissectorByCode(this.miscode).subscribe(
          res =>{ 
            this.results = res
            // this.miscode = this.results.miscode
            this.formData = this.fb.group({
              id:[this.results.id],
              miscode:[this.results.miscode],
              mis_sector:[this.results.mis_sector],
              mis_sector_desc:[this.results.mis_sector_desc],
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
            
            });
          }, 
          err =>{
            this.error =err;
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar'],
            });
          })
      }else if(this.function_type == "M-Modify"){
        this.isEnabled = true;
        this.subscription = this.SectorAPi.getMissectorByCode(this.miscode).subscribe(
          res =>{
            this.results = res;
            console.log(this.results);
            
            this.formData = this.fb.group({
              id:[this.results.id],
              miscode:[this.results.miscode],
              mis_sector:[this.results.mis_sector],
              mis_sector_desc:[this.results.mis_sector_desc],
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
        this.isDeleted = true;
        this.subscription = this.SectorAPi.getMissectorByCode(this.miscode).subscribe(
          res =>{
            this.results = res
            this.miscode = this.results.miscode
            this.formData = this.fb.group({
              id:[this.results.id],
              miscode:[this.results.miscode],
              mis_sector:[this.results.mis_sector],
              mis_sector_desc:[this.results.mis_sector_desc],
              deleteFlag:['Y'],
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
            
            });
          }, 
          err =>{
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
  console.log("Form Data", this.formData.value);
  
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
           this.router.navigate(["system/configurations/global/mis-sector/maintenance"], {skipLocationChange:true})
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
       this.subscription = this.SectorAPi.updateMissector(this.formData.value).subscribe(
         res =>{
           this.results = res
           this._snackbar.open("Executed Successfully","X",{
             horizontalPosition:this.horizontalPosition,
             verticalPosition:this.verticalPosition,
             duration:3000,
             panelClass:['green-snackbar', 'login-snackbar']

           });
           this.router.navigate(["system/configurations/global/mis-sector/maintenance"], {skipLocationChange:true})
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
      this.subscription = this.SectorAPi.updateMissector(this.formData.value).subscribe(
        res =>{
          this.results = res
          this._snackbar.open("Record Deleted Successfully","X",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['green-snackbar', 'login-snackbar']

          });
          this.router.navigate(["system/configurations/global/mis-sector/maintenance"], {skipLocationChange:true})
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
