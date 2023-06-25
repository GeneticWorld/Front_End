import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import axios from "axios";
import PDFDocument from "pdfkit";
import fs from "fs";
import express from "express";

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

export const pdfGenerate = async(req, res) => {
    try {
        const formato = req.body.formato;
        const response = await axios.get("http://localhost:3000/appointment/viewAppointment");
        const citasData = response.data[0];

        citasData.forEach(citas => {
            console.log(`id: ${citas.id}`);
            console.log(`Cedula: ${citas.cedula}`);
            console.log(`Nombre: ${citas.nombre}`);
            console.log(`Apellido: ${citas.apellido}`);
            console.log(`Telefono: ${citas.telefono}`);
            console.log(`Direccion: ${citas.direccion}`);
            console.log(`Correo: ${citas.correo}`);
            console.log(`Laboratorio: ${citas.laboratory}`);
            console.log(`Fecha: ${citas.fecha}`);
            console.log(`Hora de la cita: ${citas.horaCita}`);
            console.log(`Valor de la cita: ${citas.costoCita}`);
        });

        if (formato === "pdf") {
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment;filename=ReporteCitas.pdf');
            doc.pipe(res);

            doc.fontSize(20).text('informacion de las citas', {align: 'center'});
            // const img = fs.readFileSync('../public/images/mundogenetico.webp');
            // doc.image(img, {width: 150});

            citasData.forEach(citas => {
                doc.fontSize(12).text(`id: ${citas.id}`);
                doc.fontSize(12).text(`Cedula: ${citas.cedula}`);
                doc.fontSize(12).text(`Nombre: ${citas.nombre}`);
                doc.fontSize(12).text(`Apellido: ${citas.apellido}`);
                doc.fontSize(12).text(`Telefono: ${citas.telefono}`);
                doc.fontSize(12).text(`Direccion: ${citas.direccion}`);
                doc.fontSize(12).text(`Correo: ${citas.correo}`);
                doc.fontSize(12).text(`Laboratorio: ${citas.laboratory}`);
                doc.fontSize(12).text(`Fecha: ${citas.fecha}`);
                doc.fontSize(12).text(`Hora de la cita: ${citas.horaCita}`);
                doc.fontSize(12).text(`Valor de la cita: ${citas.costoCita}`);
                doc.moveDown();
            });
            doc.end();
        }else if(formato === 'excel'){
            const workbook = new excel.workbook();
            const worksheet = workbook.addworksheet('citas');

            worksheet.columns = [
                {header: 'Cedula', key: 'cedula', width: 20},
                {header: 'Nombre', key: 'nombre', width: 20}

            ];

            citasData.forEach((citas) => {
                worksheet.addRow({cedula: citas.cedula, nombre: citas.nombre});
            });

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.setHeader('Content-Disposition', 'attachment;filename=ReporteCitas.xlsx');

            await workbook.xlsx.write(res);

            res.end();
        }else{
            res.status(400).send('formato no valido seleccione los del menú');
        }
    } catch (error) {
        console.error(error);
    }
};
