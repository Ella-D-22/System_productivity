import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mis-sub-sector-maintenance',
  templateUrl: './mis-sub-sector-maintenance.component.html',
  styleUrls: ['./mis-sub-sector-maintenance.component.scss']
})
export class MisSubSectorMaintenanceComponent implements OnInit {
submitted = false;
loading = false;
function_type:any;
showSubSectorId:any;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  formData = this.fb.group({
    function_type:['']
  })
  functionArray:any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]

  get f() { 
    return this.formData.controls; }

onFunctionSelection(event:any){
  if(this.function_type != "Add"){

  }else if (this.function_type == 'A-Add'){
    
  }
}
  onSubmit(){

  }
}
