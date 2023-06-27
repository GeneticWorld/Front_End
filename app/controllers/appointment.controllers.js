import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import fs from "fs";



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

// export const pdfGenerate = async (req, res) => {
//     try {
//       const response = await axios.get("http://localhost:3000/appointment/viewAppointment");
//       const citasData = response.data[0];
  
//       if (formato === "pdf") {
//         const doc = new PDFDocument({ margin: 30, size: 'A4' });
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'attachment;filename=ReporteCitas.pdf');
//         doc.pipe(res);
  
//         doc.fontSize(20).text('informacion de las citas', { align: 'center' });
//         doc.moveDown();
  
//         const table = {
//           headers: [
//             "ID",
//             "Cedula",
//             "Nombre",
//             "Apellido",
//             "Telefono",
//             "Direccion",
//             "Correo",
//             "Laboratorio",
//             "Fecha",
//             "Hora de la cita",
//             "Valor de la cita"
//           ],
//           rows: citasData.map( (citas) => [
//             citas.id,
//             citas.cedula,
//             citas.nombre,
//             citas.apellido,
//             citas.telefono
//           ])
//         };
  
//         // citasData.forEach(citas => {
//         //   table.datas.push([
//         //     citas.id,
//         //     citas.cedula,
//         //     citas.nombre,
//         //     citas.apellido,
//         //     citas.telefono,
//         //     citas.direccion,
//         //     citas.correo,
//         //     citas.laboratory,
//         //     citas.fecha,
//         //     citas.horaCita,
//         //     citas.costoCita
//         //   ]);
//         // });
  
//         await doc.table(table);
  
//         doc.end();
  
        
//         fs.createReadStream("./ReporteCitas.pdf").pipe(res);
//       } else {
//         // Handle other formats if needed
//       }
//     } catch (error) {
//       // Handle errors
//     }
//   };

export const pdfGenerate = async (req, res) => {
    try {
      // Hacer una solicitud GET a la API para obtener la información
      const response = await axios.get('http://localhost:3000/appointment/viewAppointment');
      const citaData = response.data[0]; // Obtener el primer elemento del arreglo
  
      // Crear un nuevo documento PDF
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
  
      // Stream el contenido PDF a la respuesta HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=reporteCitas.pdf');
      doc.pipe(res);
  
      // Agregar el logo del proyecto
    //   const logoHeight = 50;
    //   const logoWidth = 50;
    //   const __dirname = path.resolve()
    //   const imagePath = path.resolve(path.join(__dirname, 'public', 'img', 'logoSena.png')) ;
  
    //   const pageWidth = doc.page.width;
    //   const pageHeight = doc.page.height;
  
    //   const logoX = (pageWidth - logoWidth) / 2;
    //   const logoY = 30;
  
    //   doc.image(imagePath, logoX, logoY, { width: logoWidth, height: logoHeight });
  
    //   // Agregar espacio después de la imagen
    //   doc.moveDown(2);
  
      // Agregar el encabezado
      doc.fontSize(24).text('Reporte de citas', { align: 'center' });
  
      // Agregar espacio después del encabezado
      doc.moveDown();
  
      // Crear la tabla
      const table = {
        headers: ['Id', 'Nombre', 'Apellido', 'Telefono', 'Direccion'],
        rows: citaData.map(cita => [
          cita.id,
          cita.nombre,
          cita.apellido,
          cita.telefono,
          cita.direccion
        ])
      };
  
      // Agregar la tabla al documento con un tamaño de letra más pequeño
      await doc.table(table, { width: 500, prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10), prepareRow: () => doc.font('Helvetica').fontSize(10) });
  
      // Agregar el pie de página
      const generador = 'Agendador de citas software';
      const fechaImpresion = new Date().toLocaleString();
      doc.fontSize(10).text(`Generado por: ${generador}`);
      doc.fontSize(10).text(`Fecha y hora de impresión: ${fechaImpresion}`, { align: 'right' });
  
      // Finalizar el PDF
      doc.end();
    } catch (error) {
      // Manejar errores de solicitud o cualquier otro error
      console.error(error);
      res.status(500).send('Error al generar el PDF');
    }
  };