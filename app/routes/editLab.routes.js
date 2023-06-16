import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const dashLab = Router ();


dashLab.get("/laboratorio", async(req, res)=>{
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

             let ruta = "http://localhost:3000/api/user";
             let option = {
                 method: "GET"
            }
            let datos = {};
            const result = await fetch(ruta, option)
            .then(response => response.json())
            .then(data => {
                datos = data[0]
                //console.log(data[0]);
            })
            .catch(error => console.error("Error en peticion: " + error ))


                res.render("dash", {
                "nombre" : token.nombre,
                "foto": token.foto,
                "menu" : 5,
                "datos" : datos
             });

        } catch (error) {
            res.redirect("/");
            
        }
    res.render("editLab");
}else{
    res.redirect("/")
}    
})


export default dashLab;
