import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config()


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

