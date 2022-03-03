import { Slab } from 'src/app/interfaces/slab';
export interface Interest {
    sn?: number,
    interestCode?: string,
    currency?: string,
    startDate?: Date,
    endDate?: Date,
    fullDiff?: string,
    
    postedTime?: Date,
    postedBy?: string,
    verifiedTime?: Date,
    verifiedBy?: string,
    verifiedFlag?: string,
    deletedFlag?: string,
    deletedTime?: Date,
    deletedBy?: string,
    postedFlag?:string,
    modifiedBy?: string
    modifiedTime?: Date,
    amountSlabs?: Slab[] 
}