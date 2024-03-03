import { Schema, Document, model } from 'mongoose';
export interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    salt: string;
    cart: [string];
    orders: [string];
    payments: [string];
    tokens: [string];
    otp: Number;
    otpExpires: Date;
    isVerified: boolean;
    isDeleted: boolean;
    lat: number;
    lng: number;
}

const CustomerSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},

    salt: {type: String},
    otp: {type: Number},
    otpExpires: {type: Date},
  
    cart: {type: [String]},
    orders: {type: [String]},
    payments: {type: [String]},
    tokens: {type: [String]},
    
    address: {type: String,},
    city: {type: String, },
    country: {type: String, default: 'Ethiopia'},
    isVerified: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    lat: {type: Number, default: 0},
    lng: {type: Number, default: 0}

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

const Customer = model<ICustomer>('Customer', CustomerSchema);
export { Customer }
