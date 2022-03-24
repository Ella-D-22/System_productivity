import { contactInfo } from "./contactInfo";
import { image } from "./images";
import { kin } from "./kins";
import { nominee } from "./nominees";

export interface retailKyc{
    birthCertificateNo?: string,
    citizen?: string,
    contactInformationList?: contactInfo[],
    customerCode?: string,
    customerImageList?: image[],
    deletedBy?: string,
    deletedFlag?: string,
    deletedTime?: Date,
    dob?: Date,
    employerCode?: string,
    firstName?: string,
    gender?: string,
    identificationNo?: string,
    joiningDate?: Date,
    kins?: kin[],
    kraPin?: string,
    middleName?: string,
    minor?: string,
    modifiedBy?: string,
    modifiedOn?: Date,
    nominees?: nominee[],
    occupation?: string,
    passportNo?: string,
    postedBy?: string,
    postedFlag?: string,
    postedTime?: Date,
    signatureImage?: any,
    sn?: number,
    solCode?: string,
    subGroupCode?: string,
    surname?: string,
    verifiedFlag?: string,
    verifiedTime?: Date
  }