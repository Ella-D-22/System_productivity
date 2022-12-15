import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/administration/Service/SystemConfigs/Organisation/organization.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  hide = true;
  empDetails: any[] = [];
 // dataSource: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private api: OrganizationService
  ) {}

  ngOnInit(): void {
    this.getAllWorkers();
    this.createEmployeeForm();
  }

createEmployeeForm(){
    this.employeeForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      appUserRole: ['', Validators.required],
      designation: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  getAllWorkers() {
    //this.api.get();

    this.api.get().subscribe({
      next: (res) => {
        this.empDetails = res;

        console.log('this.empDetails ', this.empDetails);

        // this.dataSource = new MatTableDataSource(res);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },
      // error: (err)=>{
      //   alert("Could not fetch Data");
      // }
    });
  }

  addEmployee() {
    console.log(this.employeeForm.value)
    
      this.api.create(this.employeeForm.value)
      .subscribe({
        next: (res) => {

          alert('Employee added successsfully!');
        
          this.employeeForm.reset();
        },
        error: (err)=>{
          alert('Employee added successsfully!');
        }
      });
    //   if (this.employeeForm.valid) {
    // }
  }
}
