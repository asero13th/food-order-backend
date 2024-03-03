import { Request, Response, NextFunction } from "express";
import {createVendorInput} from "../dto/";
import {vendor} from "../models/Vendor";
import { generateSalt, hashPassword } from "../utility";



export const createVendor = async(req: Request, res: Response, next: NextFunction) => {
    const {name, ownerName, foodType, address, phone, email, password, pincode} = <createVendorInput>req.body;

    const existingVendor = await vendor.findOne({email: email});

        if(existingVendor){
            const error = new Error('Vendor already exists');
            return res.json({message: "Vendor already exists", status: "failure"});
        }

    //generate salt
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);


     const createdVendor = await vendor.create({
        name: name, 
        ownerName: ownerName, 
        foodType: foodType, 
        address: address, 
        phone: phone, 
        email: email, 
        password: hashedPassword,
        pincode: pincode,
        salt: salt, 
        serviceAvailable: false, 
        covorImage: [], 
        rating: 0,
        foods: []
        
    });

    return res.json({message: "Vendor created successfully", status: "success"})

    };

export const getVendor = async(req: Request, res: Response, next: NextFunction) => {
    // write a code to get all vendors
    const vendors = await vendor.find({});
    return res.json({message: "Vendors fetched successfully", status: "success", data: vendors})
    };


export const getVendorById = async(req: Request, res: Response, next: NextFunction) => {

    // write a code to get a vendor by id
    const vendorId = req.params.id;
    const vendorById = await vendor.findById(vendorId);

    //Write a conditional statement to check if vendor exists
    if(vendorById !==  undefined){
        return res.json({message: "Vendor fetched successfully", status: "success", data: vendorById})
 
    }else{
         return res.status(404).send("Data not found");
    }
  
    };
