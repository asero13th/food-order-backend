import express, { Request, Response, NextFunction } from "express";
import { vendorLogin, vendorSignup,getVendorProfile, updateVendorProfile, updateVendorService, getFood, addFood, updateVendorCoverImage } from "../controllers/VendorController";
import { Authenticate } from "../middleware/CommonAuth";
import multer from "multer";


const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/vendor');

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const images = multer({ storage: imageStorage }).array('images', 10);

router.post("/login", vendorLogin);
router.post("/signup", vendorSignup);


router.use(Authenticate);
router.get("/profile",getVendorProfile);
router.patch("/profile",updateVendorProfile);
router.patch("/service",updateVendorService);
router.post("/coverimage", images , updateVendorCoverImage);
router.get("/food", getFood);
router.post("/food", images , addFood);
router.patch("/food");
router.delete("/food");



export { router as VendorRoutes}