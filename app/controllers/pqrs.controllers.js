import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config()

export const getpqrs = async (req, res) => {
    if (req.cookies.ckeib) {
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

            let ruta = "http://localhost:3000/PQRS/pqrs";
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
                .catch(error => console.error("Error en peticion: " + error))


            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 2,
                "datos": datos
            });

        } catch (error) {
            res.redirect("/");

        }
    } else {
        res.redirect("/")
    }
}

export const pqrsDelete = async(req, res)=>{
    const cedula = req.query.cedula;
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)

            const url = `http://localhost:3000/PQRS/pqrs/${cedula}`;
            const option={
                method:"DELETE"
            };
            const result =  await fetch(url, option)
            .then(response=>response.json())
            .then(data=>{
               if (data.affecteRows==1){
                console.log("borrado");
               }else{
                console.log("no borro");
               }
            })
            res.redirect("/viewPqrs/pqrs")
        }catch(error){
            console.error("error con el token");
    }
    }
}