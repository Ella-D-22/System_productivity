import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { corporateKyc } from '../../../../interfaces/corporate';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-corporate-add',
  templateUrl: './corporate-add.component.html',
  styleUrls: ['./corporate-add.component.scss']
})
export class CorporateAddComponent implements OnInit {
  corporate!: corporateKyc

  contactPersonName!: string
  corporateSegment!: string
  custCode!: string
  headOffice!: string
  inCorporationDate!: Date
  joiningDate!: Date
  kraPin!: string
  legalEntityType!: string
  organisationName!: string
  region!: string
  registrationPin!: string
  shortName!: string
  subSegment!: string
  constructor(private customerservice: CustomerService, private router: Router) {
    this.corporate={}
   }

  ngOnInit(): void {
  }
  addCorporate(){
    this.corporate.contactPersonName=this.contactPersonName
    this.corporate.corporateSegment=this.corporateSegment
    this.corporate.headOffice=this.headOffice
    this.corporate.inCorporationDate=this.inCorporationDate
    this.corporate.joiningDate=new Date()
    this.corporate.kraPin=this.kraPin
    this.corporate.legalEntityType=this.legalEntityType
    this.corporate.organisationName=this.organisationName
    this.corporate.region=this.region
    this.corporate.registrationPin=this.registrationPin
    this.corporate.shortName=this.shortName
    this.corporate.subSegment=this.subSegment

    //this.corporate.deletedBy="KAMAU"
    this.corporate.deletedFlag="N"
    //this.corporate.deletedTime=new Date()
    this.corporate.modifiedBy="KAMAU"
    this.corporate.modifiedOn=new Date()
    this.corporate.postedBy="KAMAU"
    this.corporate.postedFlag="Y"
    this.corporate.postedTime=new Date()
    this.corporate.verifiedFlag="Y"
    this.corporate.verifiedTime=new Date()

    this.customerservice.createCorporate(this.corporate).subscribe(
      data => {
        this.router.navigate(['success'], {
          state: {
            message: data,
          },
        });
      },
      (error) => {
        this.router.navigate(['failure'], {
          state: {
            message: error.error.message,
          },
        });

        console.log(error.error.message);
      }

    )

    


  }

}
