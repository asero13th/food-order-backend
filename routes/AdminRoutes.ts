//write a typescript code for admin side routing without controller 

import express,{Request, Response, NextFunction} from "express"
import {createVendor, getVendor, getVendorById} from "../controllers/AdminController"

const router = express.Router()

router.get("/",(req:Request,res:Response,next:NextFunction)=>{
    
    res.json({message:"Hello World"})
    
})
  
router.post("/vendor",createVendor)    
router.get("/vendors",getVendor)
router.get("/vendor/:id",getVendorById)

export {router as AdminRoutes}
