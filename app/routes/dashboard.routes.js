import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const dash = Router ();

dash.get("/inicio", (req, res)=>{
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)
                res.render("dash", {
                "nombre" : token.nombre,
                "foto": token.foto,
                "menu" : 0
             });

        } catch (error) {
            res.redirect("/");
            
        }
}else{
    res.redirect("/")
}    
})

dash.get("/salir", (req, res) => {
    res.clearCookie("ckeib");
    res.redirect("/");
})

export default dash;