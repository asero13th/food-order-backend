import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { validateSigniture } from "../utility/PasswordUtility";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate =  await validateSigniture(req);
    if (validate) {
        next();
    } else {
        return res.json({ message: "Unauthorized", status: "failure" });
    }
}
    
