//write a back backend that listen on port
import express from "express";
import App from "./services/ExpressApp";
import DbConnecion from "./services/Database";


const startServer = async () => {

    const app = express()
    const port = 8000
    await DbConnecion();
    await App(app);

    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
)

}

startServer() ;


