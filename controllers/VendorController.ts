import e, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { vendorLoginInput, updateVendorInput, createFoodInput } from "../dto";
import { vendor } from "../models/Vendor";
import { validatePassword, GenerateSigniture } from "../utility";
import { Food } from "../models/Foods";


export const vendorLogin = async (req: Request, res: Response) => {
    //The below code is for login of vendor
    const { email, password } = <vendorLoginInput>req.body;
    const existingVendor = await vendor.findOne({ email: email });


    if (!existingVendor) {
        return res.json({ message: "Vendor does not exist", status: "failure" });
    }

    const isPasswordValid = await validatePassword(password, existingVendor.salt, existingVendor.password);

    if (!isPasswordValid) {
        return res.json({ message: "Invalid password", status: "failure" });
    }

     await GenerateSigniture({
        _id: existingVendor._id,    
        name: existingVendor.name,
        email: existingVendor.email,
        foodType: existingVendor.foodType,
    }).then((signiture) => {
        return res.json(signiture);
    });
    
}



export const vendorSignup = async (req: Request, res: Response) => {


    const { name, ownerName , address, phone, email, password } = req.body;
    const existingVendor = await vendor.findOne({ email: email });

    if (existingVendor) {
        return res.json({ message: "Vendor already exists", status: "failure" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdVendor = await vendor.create({
        name: name,
        ownerName: ownerName,
        address: address,
        phone: phone,
        email: email,
        password: hashedPassword,
        salt: salt,
        serviceAvailable: false,
        coverImage: [],
        rating: 0,
        foods: [],
    });

    return res.json({ message: "Vendor created successfully", status: "success", data: createdVendor });
}


export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    //write the code
   const user  = req.user;
    if(user){
        const existingVendor = await vendor.findById(user._id);
        return res.json({message: "Vendor fetched successfully", status: "success", data: existingVendor});
    }else{
        
        return res.json({message: "Vendor not found", status: "failure"});
    }
}


export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {name, address, foodType, phone} = <updateVendorInput>req.body;
    const user  = req.user;
    if(user){
        const existingVendor = await vendor.findById(user._id);
        if(existingVendor){
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.foodType = foodType;
            existingVendor.phone = phone;
            const savedResult = await existingVendor.save();
            return res.json({message: "Vendor updated successfully", status: "success", data: savedResult});
        }else{
            return res.json({message: "Vendor not found", status: "failure"});
        }   
    }
                
}   
export const updateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user){
        const existingVendor = await vendor.findById(user._id);
        if(existingVendor){
            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename)

            existingVendor.coverImage.push(...images);
            const savedResult = await existingVendor.save();
            return res.json({message: "Vendor updated successfully", status: "success"});
        }else{
            return res.json({message: "Vendor not found", status: "failure"});
        }
    }
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user){
        const existingVendor = await vendor.findById(user._id);
        if(existingVendor){
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const savedResult = await existingVendor.save();
            return res.json({message: "Vendor updated successfully", status: "success"});
        }else{
            return res.json({message: "Vendor not found", status: "failure"});
        }
    }
}

export const addFood = async (req: Request, res: Response, next: NextFunction) => {
    //write the code
    const user = req.user;

    if(user){
        const existingVendor = await vendor.findById(user._id);
     

        if(existingVendor){
            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename)

            const {name, price, description, readyTime, category, foodType} =<createFoodInput> req.body;
            const createdFood = await Food.create({
                vendorId: existingVendor._id,
                name: name,
                price: price,
                description: description,
                image: images,
                readyTime: readyTime,
                rating: 0,
                category: category,
                foodType: foodType,
                images: ['hello.jpg'],
                
            });
            existingVendor.foods.push(createdFood._id);
            const result = await existingVendor.save();

            return res.json({message: "Food added successfully", status: "success", data: result});
        }

        return res.json({message: "Vendor not found", status: "failure"});
}
    

}

export const updateFood = async (req: Request, res: Response, next: NextFunction) => {
    //write the code
}


export const getFood = async (req: Request, res: Response, next: NextFunction) => {
    //write the code
    const user = req.user;
    if(user){
        const existingVendor = await vendor.findById(user._id);
        if(existingVendor){
            const foods = await Food.find({vendorId: existingVendor._id});
            return res.json({message: "Foods fetched successfully", status: "success", data: foods});
        }
        return res.json({message: "Vendor not found", status: "failure"});

    }
}






