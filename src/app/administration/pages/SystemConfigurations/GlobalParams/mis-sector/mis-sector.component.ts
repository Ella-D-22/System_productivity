import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MisSectorService } from './mis-sector.service';

@Component({
  selector: 'app-mis-sector',
  templateUrl: './mis-sector.component.html',
  styleUrls: ['./mis-sector.component.scss']
})
export class MisSectorComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private misSector:MisSectorService,
    private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  formData =  this.fb.group({
  deleteFlag: [''],
  deletedBy: [''],
  deletedTime: [''],
  id: [''],
  mis_sector: [''],
  mis_sector_desc: [''],
  modifiedBy: [''],
  modifiedTime:[''],
  postedBy:[''],
  postedFlag: [''],
  postedTime: [''],
  verifiedBy: [''],
  verifiedFlag: [''],
  verifiedTime: ['']
  })
 
  

}
