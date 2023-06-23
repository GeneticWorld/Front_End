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
    if(req.body.cedula && req.body.nombre && req.body.apellido && 
         req.body.telefono && req.body.direccion && req.body.correo
         && req.body.idLab && req.body.fecha
         && req.body.horaCita && req.body.costoCita){

        let data = {
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            correo: req.body.correo,
            idLab: req.body.idLab,
            fecha: req.body.fecha,
            horaCita: req.body.horaCita,
            costoCita: req.body.costoCita
        };
        let metodo = "POST";

        if(req.body.id){
            data = {
            id: req.body.id,
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            correo: req.body.correo,
            idLab: req.body.idLab,
            fecha: req.body.fecha,
            horaCita: req.body.horaCita,
            costoCita: req.body.costoCita
            };
            metodo = "put"
        }

        let ruta = "http://localhost:3000/appointment/saveAppointment";
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
            res.redirect("/viewA/viewAppointment");
        } catch (error) {
            console.log(error)
        }

    }else{
        console.send("Este es el error: " );
    }
}

export const editAppointment = (req, res)=>{
    const id = req.query.id;
    const  cedula = req.query.cedula;
    const  nombre = req.query.nombre;
    const  apellido = req.query.apellido;
    const  telefono = req.query.telefono;
    const  direccion = req.query.direccion;
    const  correo = req.query.correo;
    const  idLab = req.query.idLab;
    const  fecha = req.query.fecha;
    const  horaCita = req.query.horaCita;
    const costoCita = req.query.costoCita;

    let datos = {
        id: id,
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
        idLab: idLab,
        fecha: fecha,
        horaCita: horaCita,
        costoCita: costoCita
    }


    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)
            res.render("dash",{
                "nombre" : token.nombre,
                "foto" : token.foto,
                "menu" : 7,
                "datos" : datos
            })
        }catch(error){
            console.error("error con el token");
    }
}
}


export const deleteAppointment = async(req, res)=>{
    const id = req.query.id;
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)

            const url = `http://localhost:3000/appointment/deleAppointment/${id}`;
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
            res.redirect("/viewA/viewAppointment")
        }catch(error){
            console.error("error con el token");
    }
    }
}
