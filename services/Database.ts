import mongoose from "mongoose";
import { MONGO_URI } from "../config";


export default async () => {
    mongoose.connect(MONGO_URI)
    .then((result) => {
    console.log('connected to mongoDB')
 
}).catch((err) => {
    console.log(err)
})
}


    


