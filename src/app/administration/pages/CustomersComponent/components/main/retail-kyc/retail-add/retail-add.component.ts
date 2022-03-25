import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contactInfo } from '../../../../interfaces/contactInfo';
import { image } from '../../../../interfaces/images';
import { kin } from '../../../../interfaces/kins';
import { nominee } from '../../../../interfaces/nominees';
import { retailKyc } from '../../../../interfaces/retail';
import { CustomerService } from '../../../../services/customer.service';


@Component({
  selector: 'app-retail-add',
  templateUrl: './retail-add.component.html',
  styleUrls: ['./retail-add.component.scss']
})
export class RetailAddComponent implements OnInit {
  retail: retailKyc

  imgfile: File = null; // Variable to store file
  signfile: File = null; // Variable to store file

  citizen: string="Y";
  minor: string="N";

customerPhoto!: image

  customerImage!: any

  birthCertificateNo!: string
  contactInformationList: contactInfo[]=[]
  customerCode!: string
  customerImageList: image[]=[]
  dob!: Date
  employed!: string
  employerCode!: string
  firstName!: string
  gender!: string
  identificationNo!: string
  guardianCode!: string
  joiningDate!: Date
  kins: kin[]=[]
  kraPin!: string
  middleName!: string
  nominees: nominee[]=[]
  occupation!: string
  passportNo!: string
  signatureImage!: any
  sn!: number
  solCode!: string
  subGroupCode!: string
  surname!: string

  boxOfficeNo!: string
  emailAddress!: string
  phoneNumber!: string
  postalCode!: string
  residentialTown!: string

  kdob!: Date
  kemailAddress!: string
  kfirstName!: string
  kidNo!: string
  kmiddleName!: string
  koccupation!: string
  kphoneNo!: string
  krelationship!: string
  ksurname!: string

  ndob!: Date
  nemailAddress!: string
  nfirstName!: string
  nidNo!: string
  nmiddleName!: string
  noccupation!: string
  nphoneNo!: string
  nsurname!: string

  contacts!: contactInfo
  kin!: kin
  nominee!: nominee




  constructor(private customerservice: CustomerService, private router: Router) { 
    this.retail={}
    this.contacts={}
    this.kin={}
    this.nominee={}
    this.customerPhoto={}
  }

  ngOnInit(): void {
  }

  retailSave(){
    this.retail.birthCertificateNo=this.birthCertificateNo
    this.retail.dob=this.dob
    this.retail.employerCode=this.employerCode
    this.retail.firstName=this.firstName
    this.retail.gender=this.gender
    this.retail.identificationNo=this.identificationNo
    //this.retail.guardianCode
    this.retail.joiningDate= this.joiningDate
    this.retail.kraPin=this.kraPin
    this.retail.middleName=this.middleName
    this.retail.occupation=this.occupation
    this.retail.passportNo=this.passportNo
    this.retail.signatureImage=this.signatureImage
    this.retail.solCode=this.solCode
    //this.retail.subGroupCode=this.subGroupCode
    this.retail.surname=this.surname

    this.retail.joiningDate=new Date()
    this.retail.subGroupCode="TEST"


    this.retail.verifiedFlag="Y"
    this.retail.verifiedTime=new Date()
    this.retail.deletedBy="CHEGE"
    this.retail.deletedFlag="N"
    this.retail.deletedTime=new Date()
    this.retail.postedBy="CHEGE"
    this.retail.postedFlag="Y"
    this.retail.postedTime=new Date()
    this.retail.modifiedBy="CHEGE"
    this.retail.modifiedOn=new Date()

    this.customerPhoto.image=this.customerImage

    this.contacts={
      boxOfficeNo: this.boxOfficeNo,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
      postalCode:this.postalCode,
      residentialTown: this.residentialTown,

    }

    this.kin={
      dob:this.kdob,
      emailAddress:this.emailAddress,
      firstName:this.kfirstName,
      idNo:this.kidNo,
      middleName:this.kmiddleName,
      occupation:this.koccupation,
      phoneNo:this.kphoneNo,
      relationship:this.krelationship,
      surname:this.ksurname
    }

    this.nominee={
      dob: this.ndob,
      emailAddress: this.nemailAddress,
      firstName: this.nfirstName,
      identificationNo: this.nidNo,
      lastName: this.nsurname,
      middleName: this.nmiddleName,
      occupation: this.noccupation,
      phone: this.nphoneNo
    }
    
    

    this.contactInformationList.push(this.contacts)
    this.customerImageList.push(this.customerPhoto)
    this.kins.push(this.kin)
    this.nominees.push(this.nominee)

    this.retail.customerImageList=this.customerImageList
    this.retail.customerImageList=this.customerImageList
    this.retail.kins=this.kins
    this.retail.nominees=this.nominees
    this.retail.citizen=this.citizen
    this.retail.minor=this.minor

    console.log(this.retail)
    this.customerservice.createRetail(this.retail).subscribe(
      (data) => {
        this.router.navigate(['success'], {
          state: {
            message: data,
          },
        });
      },
      (error) => {
        console.log("this is the error", error);
        
        this.router.navigate(['failure'], {
          state: {
            message: error.error.message,
          },
        });

        console.log(error.error.message);
      }
    )
  }

  onPhotoChange(event) {
    this.imgfile = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
                    var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
reader.onload = () => {
this.customerImage=reader.result;
}
reader.onerror = function (error) {
 console.log('Error: ', error);
};

}

}

onSignatureChange(event) {
  this.signfile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
 
                        var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
reader.onload = () => {
this.signatureImage=reader.result;
}
reader.onerror = function (error) {
console.log('Error: ', error);
};

}
}



}