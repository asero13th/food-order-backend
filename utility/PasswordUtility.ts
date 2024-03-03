import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { vendorPayload } from "../dto";
import { APP_SECRET } from "../config";
import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";



export const generateSalt = async () => {
    return await bcrypt.genSalt(10);
     }

export const hashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
    }

export const validatePassword = async (password: string, salt: string, hashedPassword: string) => {
    
    return await bcrypt.compare(password, hashedPassword);
    }

export const GenerateSigniture = async (payload: AuthPayload) => {
    return jwt.sign(payload, APP_SECRET,  { expiresIn: '1d' });
    }

export const validateSigniture = async (req: Request) => {
    const signiture = req.get("authorization");

    if (signiture){
        const payload = await jwt.verify(signiture.split(" ")[1], APP_SECRET) as AuthPayload;
        req.user = payload;
        return true;
    }
    return false;
    
    }