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

export const saveAppointment = (req, res) => {
    if(req.body.cedula && req.body.nombre &&  req.body.apellido && 
         req.body.telefono  &&  req.body.direccion &&  req.body.correo
         &&  req.body.id_laboratorio &&  req.body.fecha
         &&  req.body.horaCita &&  req.body.costoCita){

        let data = {
            cedula: req.body.cedula,
            nombre_completo: req.body.nombre,
            descripcion: req.body.apellido,
            telefonono: req.body.telefono,
            direccion: req.body.direccion,
            correo: req.body.correo,
            laboratorio: req.body.id_laboratorio,
            fecha: req.body.fecha,
            horaCita: req.body.horaCita,
            costoCita: req.body.costoCita



        };
        let metodo = "POST";

        if(req.body.id){
            data = {
            id: req.body.id,
            cedula: req.body.cedula,
            nombre_completo: req.body.nombre,
            descripcion: req.body.apellido,
            telefonono: req.body.telefono,
            direccion: req.body.direccion,
            correo: req.body.correo,
            laboratorio: req.body.id_laboratorio,
            fecha: req.body.fecha,
            horaCita: req.body.horaCita,
            costoCita: req.body.costoCita
                

            };
            metodo = "put"
        }

        let ruta = "http://localhost:3000/PQRS/pqrs";
        let option = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const result = fetch(ruta, option)
            .then(res => res.json())
            .then(data => {
                //aqui vamos
            })
            .catch(err => console.log("Error al consumir API: " + err))
            res.redirect("/viewPqrs/viewpqrs");
        } catch (error) {
            
        }

    }else{
        console.send("Este es el error: " );
    }
}