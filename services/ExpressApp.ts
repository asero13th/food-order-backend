//write a back backend that listen on port
import express,{Application} from "express";
import bodyParser from "body-parser";
import path from "path";
import {AdminRoutes, VendorRoutes, ShoppingRoutes,CustomerRoutes} from "../routes";


export default async (app: Application) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use("/images", express.static(path.join(__dirname, "images")))


    app.use('/admin', AdminRoutes)
    app.use('/vendor', VendorRoutes)
    app.use('/customer', CustomerRoutes)
    app.use(ShoppingRoutes)
    return app;
    
}







