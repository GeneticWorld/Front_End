import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const appointment = async(req, res)=>{
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

            let ruta = "http://localhost:3000/appointment/viewAppointment";
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
                "menu" : 3,
                "datos" : datos
             });

        } catch (error) {
            res.redirect("/");
            
        }
}else{
    res.redirect("/")
}    
};