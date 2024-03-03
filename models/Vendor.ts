import mongoose,{Schema, Document, Model} from 'mongoose';

export interface VendorDoc extends Document {
    id: number;
    name: string;
    ownderName: string;
    foodType: string;
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImage: [string];
    rating: number;
    foods: any;
}

const VendorSchema: Schema = new Schema({

    name: {type: String, required: true},
    ownerName: {type: String, required: true},
    foodType: {type: [String]},
    pincode: {type: String},
    address: {type: String},
    phone: {type: String , required: true},
    email: {type: String, required: true},
    password: {type: String , required: true},
    salt: {type: String, required: true},
    serviceAvailable: {type: Boolean},
    coverImage: {type: [String]},
    rating: {type: Number},
    foods: [{type:   mongoose.Schema.Types.ObjectId, ref: 'Food'}]
}, {
    toJSON : {
        transform(doc, ret){
        delete ret.password;
        delete ret.salt;
        }
    }
    ,timestamps: true});

const vendor = mongoose.model<VendorDoc>('Vendor', VendorSchema);
export  {vendor};