import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config()

export const getEmail = async (req, res) => {
    if (req.cookies.ckeib) {
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

            let ruta = "http://localhost:3000/api/email";
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
                "menu": 1,
                "datos": datos
            });

        } catch (error) {
            res.redirect("/");

        }
    } else {
        res.redirect("/")
    }
}

export const save = (req, res) => {
    if(req.body.email){

        let data = {
            email: req.body.email
        };
        let metodo = "POST";

        if(req.body.id){
            data = {
                id: req.body.id,
                email: req.body.email
            };
            metodo = "put"
        }

        let ruta = "http://localhost:3000/api/email";
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
            res.redirect("/viewEmail/email");
        } catch (error) {
            
        }

    }else{
        console.send("Este es el error: " );
    }
}

export const emailEdit = (req, res)=>{
    const id = req.query.id;
    const email = req.query.email;

    let datos = {
        id: id,
        email: email
    }


    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)
            res.render("dash",{
                "nombre" : token.nombre,
                "foto" : token.foto,
                "menu" : 4,
                "datos" : datos
            })
        }catch(error){
            console.error("error con el token");
    }
}
}


export const emailDelete = async(req, res)=>{
    const id = req.query.id;
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)

            const url = `http://localhost:3000/api/email/${id}`;
            const option={
                method:"DELETE"
            };
            const result =  await fetch(url, option)
            .then(response=>response.json())
            .then(data=>{
               if (data[0].affecteRows==1){
                console.log("borrado");
               }else{
                console.log("no borro");
               }
            })
            

            res.redirect("/viewEmail/email")

        }catch(error){
            console.error("error con el token");
    }
    }
}

