import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginRouter = Router();

loginRouter.get("/google", (req, res) => {
    const id = req.user.id;
    const name = req.user.displayName;
    const email = req.user.emails[0].value;
    const foto = req.user.photos[0].value;

    const payload = {
        nombre:name,
        correo: email,
        foto: foto
    }

    console.log (name)

    const token = jwt.sign
    (payload, 
        process.env.SECRET_KEY,
            {"expiresIn": process.env.EXPIRE_TOKEN});

    res.cookie("ckeib" , token);
    
    res.redirect("../v1/inicio");
    
    //res.render("backOffice", {nombre: name});
    //res.redirect("backOffice");
});

export { loginRouter };