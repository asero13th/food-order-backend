import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
 
  @Length(7, 15)
  phone: string

}

export interface customerPayload {
  _id: string;
  email: string;
  isVerified: boolean;
}


export class customerLoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface updateCustomerInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}


