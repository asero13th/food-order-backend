import express, {Request, Response, NextFunction} from 'express';
import { FoodAvailability, TopRestourants, fastFoods, searchFoods, getRestourant } from '../controllers';
const router = express.Router();


router.get("/:pincode", FoodAvailability) // food availability

router.get("/top-restorants/:pincode", TopRestourants) // top restoranets

router.get("/fast-foods/:pincode", fastFoods) // Foods available i 30 minutes

router.get("/search/:pincode", searchFoods) //search Foods

router.get("/restorant/:id", getRestourant) //Find restorant by Id

export {router as ShoppingRoutes}


