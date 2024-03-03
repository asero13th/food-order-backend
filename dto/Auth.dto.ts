import { vendorPayload } from "./Vendor.dto";
import { customerPayload } from "./Customer.dto";
export type AuthPayload = vendorPayload | customerPayload;