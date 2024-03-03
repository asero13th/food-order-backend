import express, {Request, Response, NextFunction} from 'express';
import { vendor } from '../models';
import { FoodDoc } from '../models';
export const FoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode;
    const foods = await vendor.find({pincode: pincode, serviceAvailable: false}).sort({rating: -1}).populate('foods');
    
    if (foods.length > 0){
        return res.status(200).json({message: "Foods available", data: foods});
    }else{
        return res.status(400).json({message: "Foods not available"});
    }


}


export const TopRestourants = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode;
    const toprestourant = await vendor.find({pincode: pincode, serviceAvailable: false}).sort({rating: -1}).limit(1);
    
    if (toprestourant.length > 0){
        return res.status(200).json({message: "Foods available", data: toprestourant});
    }else{
        return res.status(400).json({message: "data not available"});
    }

}

export const searchFoods = async (req: Request, res: Response, next: NextFunction) => {
        const pincode = req.params.pincode
        const result = await vendor.find({pincode: pincode, serviceAvailable: false}).populate("foods");

        if (result.length > 0){
            const foodResult: any = []

            result.map(vendor => {
                const foods = vendor.foods as [FoodDoc]
                foodResult.push(...foods)
            
        })
        return res.status(200).json(foodResult);
     
}
return res.status(400).json({message: "data not found"})
}

export const fastFoods = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode;
    const result = await vendor.find({pincode: pincode, serviceAvailable: false}).populate("foods");
    
    if (result.length > 0){
        let foodResult: any = []

        result.map(vendor =>{
            const foods = vendor.foods as [FoodDoc]

            foodResult.push(...foods.filter(food => food.readyTime <= 30))
            
        })

    return res.status(200).json(foodResult)
}
    return res.status(400).json({message: "data not found"});

}



export const getRestourant = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await vendor.findById(id);

    if (result){
        return res.status(200).json(result);
    }else{
        return res.status(400).json({message: "data not found"});
    }

}
