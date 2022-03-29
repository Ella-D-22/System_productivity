import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollateralLookupComponent } from '../collateral-lookup/collateral-lookup.component';
import { CollateralService } from '../collateral.service';
import { FormGroup, FormControl } from '@angular/forms';
export interface ApiData{
  collateralType ?: string;
  collateralCode ?: string;
  description ?: string;
  companyCode ?: string;
  companyDetails ?: string;
  contactDetails ?: string;
  customerCode?:string;
  faceValue?: 0;
  margin ?: 0;
  marketValue ?:0,
  otherDetails ?:string;
  chargeEventForLodging ?:string,
  chargEventForWithdrawal ?:string;
  percentageDrawingPower ?:0,
  percentageLoanToTake ?:0,
  shareCapital ?:0,
  shareIssued ?:0,
  deletedBy ?: string;
  deletedTime ?: Date;
  deletedFlag ?:string
  verifiedBy ?: string;
  verifiedTime ?:  Date;
  verifiedFlag ?: string;
  postedBy ?:string;
  postedTime ?: string;
  postedFlag ?: string;
  modifiedBy ?: string;
  modifiedTime ?: Date;
  sn ?: 0

}

@Component({
  selector: 'app-collateral-maintenance',
  templateUrl: './collateral-maintenance.component.html',
  styleUrls: ['./collateral-maintenance.component.scss']
})
export class CollateralMaintenanceComponent implements OnInit {
  horizontalPosition:MatSnackBarHorizontalPosition = 'end';
  verticalPosition :MatSnackBarVerticalPosition = 'top';
  subscription !:Subscription;
  params:any;
  lookupdata:any;
  newData = true;
  allcoretarals:ApiData[] = [] ;

  loading=false;
  submitted = false;
  collateralCode:any;
  function_type:any;
  error:any;
  description:any;
  available =false;
  show:boolean = false;
  showCode:boolean=false;

  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','D-Delete'
  ]
  Code: any;
  
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private _snackBar:MatSnackBar,
    private dialog:MatDialog,
    private collateralService:CollateralService) { }

  ngOnInit(): void {
    this.collateralService.retrieveAllColletaralsDefinitions().subscribe(
      data =>{
        this.allcoretarals = data.entity
       
        
      }
    )
  }
 
  

  formData = this.formBuilder.group({
    function_type:['',[Validators.required]],
    collateralCode:['',[Validators.required]]
  })
   

  collateralLookup(){
    const dialogRef = this.dialog.open(CollateralLookupComponent,{
      height: '400px',
      width:'600px'

    });
    dialogRef.afterClosed().subscribe(
      result =>{
        this.lookupdata = result.data;
        this.collateralCode = this.lookupdata.collateralCode;
        this.description = this.lookupdata.description;
        this.formData.controls['collateralCode'].setValue(result.data.collateralCode)
        console.log(this.lookupdata.collateralCode);
        
        console.log("This collera", result.data.collateralCode);
        
      }
    )

  }
   
  onSelectionFunction(event:any){
    console.log(this.allcoretarals);
    
    // console.log(event.target.value);
    this.function_type = event.target.value;
    if(event.target.value != "A-Add"){
      
      // this.formData.controls['collateralCode'].setValue("")
      this.formData.controls['collateralCode'].setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.formData.controls['collateralCode'].setValidators([])
      // this.formData.controls['collateralCode'].setValue("")
      console.log(event.target.value);
      
    }
  }


   get f() { 
     return this.formData.controls; }
    
   onSubmit(){
     console.log(this.formData.value);
     console.log(this.available);
     console.log(this.allcoretarals);
     this.Code = this.formData.value['colletaralCode']
     for(let cls of this.allcoretarals){
      console.log("Result",cls.collateralCode);
      //  console.log("Colletral Code", this.formData.value.collateralCode);
       
       if(this.formData.value.collateralCode == cls.collateralCode){
         this.available = true;
         console.log("Results",cls);
         
         console.log(this.available);
         
         break
       }else{this.available = false }}
     console.log('Check availability', this.available);
     
     this.loading = false;
     this.submitted = true;
      if(this.formData.valid ){
        console.log("test",this.available)
       
        this.function_type = this.formData.value['function_type']
        console.log("test", this.function_type)
        if(this.available == false && this.function_type == 'A-Add'){
          this.router.navigate(['configurations/limits and collateral/Collateral/data/view'],{
            state:this.formData.value
          })
          console.log(this.available);
          
        }
        else if(this.available == false && this.function_type != 'A-Add') {
          // this.available = false;
          this.showCode = true;
          this.loading = false;
        }
         else if(this.available == true && this.function_type == 'A-Add'){
           //this.available = false;
          this.show = true;
          this.loading = false;
         console.log(this.available);
         
        }else if(this.available == true && this.function_type != 'A-Add'){
          this.router.navigate(['configurations/limits and collateral/Collateral/data/view'],{
            state:this.formData.value
          })
          console.log(this.available);
          
        }
       
     
      
      }
      else { 
      
        this.loading = false;
        this._snackBar.open("Invalid Form Data", "Try Again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackBar', 'login-snackBar'],
        })
      }
    }
 
  




  

}
