import mongoose,{Schema, Document} from "mongoose";

export interface FoodDoc extends Document{
    vendorId: string;
    name: string;
    price: number;
    description: string;
    image: [string];
    readyTime: number;
    rating: number;
    category: string;
    foodType: string;
    images: [string];
}


const FoodSchema: Schema = new Schema({
    vendorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Vendor'},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true  },
    image: {type: [String]},
    readyTime: {type: Number},
    rating: {type: Number},
    category: {type: String},
    foodType: {type: String, required: true},
    images: {type: [String]} 
}, {
    toJSON : {
        transform(doc, ret){
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        }
    }
    ,timestamps: true
});

const Food  = mongoose.model<FoodDoc>('Food', FoodSchema);
export {Food}