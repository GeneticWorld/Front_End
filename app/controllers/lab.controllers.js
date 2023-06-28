import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import path from "path";

export const viewLab = async (req, res) => {
    if (req.cookies.ckeib) {
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

            let ruta = "http://localhost:3000/labApi/laboratory";
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
                "menu": 5,
                "datos": datos
            });

        } catch (error) {
            // res.redirect("/");

        }
    } else {
        // res.redirect("/")
    }
}

// FALTA POR ARREGLAR
export const saveLab = (req, res) => {
    if(req.body.laboratory){

        let data = {
            laboratory: req.body.laboratory
        };
        let metodo = "POST";

        if(req.body.id){
            data = {
                id: req.body.id,
                laboratory: req.body.laboratory
            };
            metodo = "put"
        }

        let ruta = "http://localhost:3000/labApi/laboratory";
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
            res.redirect("/viewlab/lab");
        } catch (error) {
            
        }

    }else{
        console.send("hay un error: ");
    }
}

export const labEdit = (req, res)=>{
    const id = req.query.id;
    const laboratory = req.query.laboratory;

    let datos = {
        id: id,
        laboratory: laboratory
    }


    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)
            res.render("dash",{
                "nombre" : token.nombre,
                "foto" : token.foto,
                "menu" : 6,
                "datos" : datos
            })
        }catch(error){
            console.error("error con el token");
    }
}
}

export const labDelete = async(req, res)=>{
    const id = req.query.id;
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)

            const url = `http://localhost:3000/labApi/laboratory/${id}`;
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
            res.redirect("/viewLab/lab")
        }catch(error){
            console.error("error con el token");
    }
    }
}

export const pdfGenerate = async (req, res) => {
    try {
      // Hacer una solicitud GET a la API para obtener la información
      const response = await axios.get('http://localhost:3000/labApi/laboratory');
      const labData = response.data[0]; // Obtener el primer elemento del arreglo
  
      // Crear un nuevo documento PDF
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
  
      // Stream el contenido PDF a la respuesta HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=reporteLaboratorios.pdf');
      doc.pipe(res);
  
      // Agregar el encabezado
      doc.fontSize(24).text('Reporte de laboratorios', { align: 'center' });
  
      // Agregar espacio después del encabezado
      doc.moveDown(3);

    // Agregar el logo del proyecto
      const logoHeight = 80;
      const logoWidth = 80;
      const __dirname = path.resolve()
      const imagePath = path.resolve(path.join(__dirname, 'public', 'images', 'logoMundoGenetico.png')) ;
  
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
  
      const logoX = 30;
      const logoY = 100;
  
        doc.image(imagePath, logoX, logoY, { width: logoWidth, height: logoHeight });
  
      // Agregar espacio después de la imagen
      doc.moveDown(2);
  
      // Crear la tabla
      const table = {
        headers: ['Id', 'Laboratorio'],
        rows: labData.map(lab => [
          lab.id,
          lab.laboratory
        ])
      };
  
      // Agregar la tabla al documento con un tamaño de letra más pequeño
      await doc.table(table, { width: 500, prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10), prepareRow: () => doc.font('Helvetica').fontSize(10) });
      doc.moveDown(2)
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