export interface createVendorInput {
    id: number;
    name: string;
    ownerName: string;
    foodType: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    pincode: string;
}

export interface updateVendorInput {

    name: string;
    foodType: string;
    address: string;
    phone: string;

}

export interface vendorLoginInput {
    email: string;
    password: string;
}

export interface vendorPayload
{
    _id: number;
    email: string;
    name: string;
    foodType: string;
    
}