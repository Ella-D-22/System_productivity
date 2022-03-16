import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mis-sub-sector',
  templateUrl: './mis-sub-sector.component.html',
  styleUrls: ['./mis-sub-sector.component.scss']
})
export class MisSubSectorComponent implements OnInit {
function_type:any
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
   formData = this.fb.group({
    deleteFlag:[''],
    deletedBy: [''],
    deletedTime:[''],
    id: [''],
    mis_sub_sector: [''],
    mis_sub_sector_desc: [''],
    modifiedBy: [''],
    modifiedTime: [''],
    postedBy: [''],
    postedFlag: [''],
    postedTime: [''],
    verifiedBy: [''],
    verifiedFlag: [''],
    verifiedTime:['']
   })
onSubmit(){
  
}
}
