import express, { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { customerLogin, customerSignUp, customerOtp, customerProfile, customerUpdateProfile, customerVerify } from "../controllers//CustomerController";
import { Authenticate } from "../middleware/CommonAuth";
const router = express.Router();


router.post('/signup', customerSignUp) //sign up
router.post('/login', customerLogin) //login

router.use(Authenticate)

router.patch('/verify', customerVerify) //verify token
router.get('/otp', customerOtp) //otp
router.get('/profile', customerProfile) //profile
router.patch('/profile', customerUpdateProfile) //update profile


//cart


//order


//payment
export {router as CustomerRoutes}