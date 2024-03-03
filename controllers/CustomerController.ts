import { CustomerDto, customerLoginInput, updateCustomerInput } from "../dto"
import express,{Request, Response, NextFunction} from "express"
import { Customer } from "../models/Customer"
import bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { GenerateSigniture, generateSalt, hashPassword,generateOtp, onRequestOtp, validatePassword  } from "../utility";
import { vendor } from "../models";




export const customerSignUp = async (req:Request,res:Response,next:NextFunction)=>{
       const customerInputs = plainToClass(CustomerDto, req.body);
       const inputErrors = await validate(customerInputs, {validationError:{target:true}});

         if(inputErrors.length > 0){
                return res.status(400).json(inputErrors)
            }

        const {firstName, lastName, email, password, phone} = customerInputs;
        const salt = await generateSalt()
        const hashedPassword = await hashPassword(password, salt)
        
        const {otp, expires} = await generateOtp();
    
        const existingCustomer = await Customer.findOne({email: email});
        if(existingCustomer){
            return res.status(400).json({message: 'Customer already exists'})
        }

        const result = await Customer.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            phone: phone,
            salt: salt,
            otp: otp,
            otpExpires: expires
        })

        if(result){
            
           // await onRequestOtp(otp, phone)    //send otp to the user
              
            //generate signiture
            const signiture = await GenerateSigniture({_id: result._id, email: result.email, isVerified: result.isVerified})

            //send signiture to the user
            return res.status(201).json({signiture: signiture, veified: result.isVerified, email: result.email})
        }

        return res.status(400).json({message: 'Error with signup'})



}

export const customerLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const customerInputs = plainToClass(customerLoginInput, req.body);
    const inputErrors = await validate(customerInputs, {validationError:{target:true}});

        if(inputErrors.length > 0){
            return res.status(400).json(inputErrors)
        }

    const {email, password} = customerInputs;
    const result  = await Customer.findOne({email: email});

    if(!result){
        return res.status(400).json({message: 'Customer does not exist'})
    }

    const isPasswordValid = await validatePassword(password, result.salt, result.password);

    if(!isPasswordValid){
        return res.status(400).json({message: 'Invalid password'})
    }

    const signiture = await GenerateSigniture({
        _id: result._id, 
        email: result.email, 
        isVerified: result.isVerified
    })

    return res.status(200).json(signiture)

}

export const customerVerify = async (req:Request,res:Response,next:NextFunction)=>{
    const {otp} = req.body;
    const customer = req.user;

   if (customer){
    const profile  = await Customer.findOne({_id: customer._id});

    if(!profile){
        return res.status(400).json({message: 'Customer does not exist'})
    }

    if(profile.otp !== otp){
        return res.status(400).json({message: 'Invalid otp'})
    }   

    if(profile.otpExpires < new Date()){
        return res.status(400).json({message: 'Otp expired'})
    }


    const result = await Customer.updateOne({_id: customer._id}, {isVerified: true, otp: null, otpExpires: null})
    if (result){
        const signiture = await GenerateSigniture({
            _id: profile._id,
            email: profile.email,
            isVerified: profile.isVerified
        })
        return res.status(200).json({signiture: signiture, verified: profile.isVerified, email: profile.email})
    
    }   
   }
   return res.status(404).json({message: 'Error verifying customer'})


}

export const customerOtp = async (req:Request,res:Response,next:NextFunction)=>{

    const user = req.user;

    if(user){
        const customer =await Customer.findById(user._id)
        if(customer){
            const {otp, expires} = await generateOtp();

            customer.otp = otp;
           
        }
    }
    

}

export const customerProfile = async (req:Request,res:Response,next:NextFunction)=>{
        const user = req.user;
       
        if(user){

            const profile = await Customer.findById(user._id);

            if(profile){
                return res.status(200).json(profile)
            }
            return res.status(400).json({message: 'Error getting profile'})
        }
        return res.status(400).json({message: 'Error getting profile'})
}



export const customerUpdateProfile = async (req:Request,res:Response,next:NextFunction)=>{
        const user = req.user;
        const {firstName, lastName, phone, city, address, country} = <updateCustomerInput>req.body;

        if(user){
            const profile = await Customer.findById(user._id);

            if(!profile){
                return res.status(400).json({message: 'Customer does not exist'})
            }

            const result = await Customer.updateOne({_id: user._id}, {
                firstName: firstName || profile.firstName,
                lastName: lastName || profile.lastName,
                phone: phone || profile.phone,
                city: city || profile.city,
                address: address || profile.address,
                country: country || profile.country
            })

            if(result){
                return res.status(200).json({message: 'Profile updated successfully'})
            }
            return res.status(400).json({message: 'Error updating profile'})
        }

        return res.status(400).json({message: 'Error updating profile'})

}

export const customerCart = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrder = async (req:Request,res:Response,next:NextFunction)=>{
        
}

export const customerPayment = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrderHistory = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrderDetails = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrderCancel = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrderTrack = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrderTrackDetails = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrderTrackCancel = async (req:Request,res:Response,next:NextFunction)=>{

}

export const customerOrderTrackReturn = async (req:Request,res:Response,next:NextFunction)=>{

}




