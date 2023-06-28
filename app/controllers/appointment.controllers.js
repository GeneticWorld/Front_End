// Modulos
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import path from "path";

// Muestra toda la información
export const appointment = async(req, res) => {
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY);

            let ruta = "http://localhost:3000/appointment/viewAppointment";
            let option = {
                method: "get"
            };

            let datos = {};

            const result = await fetch(ruta, option)
            .then(response => response.json())
            .then(data => {
                datos = data[0]
            })
            .catch(error => console.error("Error en peticion: " + error ));

                res.render("dash", {
                "nombre" : token.nombre,
                "foto": token.foto,
                "menu" : 3,
                "datos" : datos

             });

        } catch (error) {
            res.redirect("/");
            
        };
}else{
    res.redirect("/");
};

};

// Inserta información
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
        
        let metodo = "post";

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

            metodo = "put";
        };

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
                
            })
            .catch(err => console.log("Error al consumir API: " + err));

            res.redirect("/viewA/viewAppointment");

        } catch (error) {
            console.log(error);
        };

    }else{
        console.send("Este es el error: " + error);
    };
};

// Edita la información
export const editAppointment = (req, res) => {
    const id = req.query.id;
    const cedula = req.query.cedula;
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const telefono = req.query.telefono;
    const direccion = req.query.direccion;
    const correo = req.query.correo;
    const idLab = req.query.idLab;
    const fecha = req.query.fecha;
    const horaCita = req.query.horaCita;
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
    };

    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY);

            res.render("dash",{
                "nombre" : token.nombre,
                "foto" : token.foto,
                "menu" : 7,
                "datos" : datos
            });

        }catch(error){
            console.error("Error con el token:" + error);
    };
};
};

// Elimina información
export const deleteAppointment = async(req, res) => {
    const id = req.query.id;

    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY);

            const url = `http://localhost:3000/appointment/deleAppointment/${id}`;

            const option={
                method:"delete"
            };

            const result =  await fetch(url, option)
            .then(response => response.json())
            .then(data => {
               if (data[0].affecteRows === 1){
                console.log("Borrado");
               }else{
                console.log("No borro");
               };
            });

            res.redirect("/viewA/viewAppointment");

        }catch(error){
            console.error("error con el token");
    };
    };
};

// Genera PDF con los datos de la tabla
export const pdfGenerate = async (req, res) => {
    try {
      const response = await axios.get('http://localhost:3000/appointment/viewAppointment');

      const citaData = response.data[0]; 
  
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=reporteCitas.pdf');
      doc.pipe(res);
  
      // Agrega el encabezado
      doc.fontSize(24).text('Reporte de citas', { align: 'center' });
  
      // Agrega espacio después del encabezado
      doc.moveDown(3);

    // Agrega el logo del proyecto
      const logoHeight = 80;
      const logoWidth = 80;
      const __dirname = path.resolve()
      const imagePath = path.resolve(path.join(__dirname, 'public', 'images', 'logoMundoGenetico.png')) ;
      const logoX = 30;
      const logoY = 100;
  
      doc.image(imagePath, logoX, logoY, { width: logoWidth, height: logoHeight });
  
      // Agrega espacio después de la imagen
      doc.moveDown(2);
  
      // Crear la tabla
      const table = {
        headers: ['Id', 
        'Nombre', 
        'Apellido', 
        'Telefono', 
        'Direccion', 
        'Correo', 
        'Laboratorio', 
        'Fecha', 
        'Hora de la cita', 
        'Valor de la cita'],
        rows: citaData.map(cita => [
          cita.id,
          cita.nombre,
          cita.apellido,
          cita.telefono,
          cita.direccion,
          cita.correo,
          cita.laboratory,
          cita.fecha,
          cita.horaCita,
          cita.costoCita
        ])
      };
  
      // Agrega la tabla al documento con un tamaño de letra más pequeño
      await doc.table(table, { width: 500, prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10), prepareRow: () => doc.font('Helvetica').fontSize(10) });

      doc.moveDown(2)

      // Agrega el pie de página
      const generador = 'Agendador de citas software';
      const fechaImpresion = new Date().toLocaleString();
      doc.fontSize(10).text(`Generado por: ${generador}`);
      doc.fontSize(10).text(`Fecha y hora de impresión: ${fechaImpresion}`, { align: 'right' });
  
      // Finaliza el PDF
      doc.end();

    } catch (error) {
      // Maneja errores de solicitud o cualquier otro error
      console.error(error);
      res.status(500).send('Error al generar el PDF');
    };
};