import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const dash = Router ();
dash.get("/inicio", (req, res)=>{
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)
                res.render("dash", {
                "nombre" : token.nombre,
                "foto": token.foto,
                "menu" : 0
             });

        } catch (error) {
            res.redirect("/");
            
        }
}else{
    res.redirect("/")
}    
})

// dash.get("/laboratorio", async(req, res)=>{
//     if (req.cookies.ckeib){
//         try {
//             const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

//              let ruta = "http://localhost:3000/api/user";
//              let option = {
//                  method: "GET"
//             }
//             let datos = {};
//             const result = await fetch(ruta, option)
//             .then(response => response.json())
//             .then(data => {
//                 datos = data[0]
//                 //console.log(data[0]);
//             })
//             .catch(error => console.error("Error en peticion: " + error ))


//                 res.render("dash", {
//                 "nombre" : token.nombre,
//                 "foto": token.foto,
//                 "menu" : 5,
//                 "datos" : datos
//              });

//         } catch (error) {
//             res.redirect("/");
            
//         }
//     res.render("dash");
// }else{
//     res.redirect("/")
// }    
// })

dash.get("/editLab",(req, res)=>{
    const id = req.query.id;
    const name = req.query.name;

    let datos = {
         id: id,
        name: name
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
})

dash.get("/pqrs", (req, res)=>{
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)
                res.render("dash", {
                "nombre" : token.nombre,
                "foto": token.foto,
                "menu" : 2
             });

        } catch (error) {
            res.redirect("/");
            
        }
    res.render("dash");
}else{
    res.redirect("/")
}    
})

dash.get("/appointment", async(req, res)=>{
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

            let ruta = "http://localhost:3000/api/user";
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
    res.render("dash");
}else{
    res.redirect("/")
}    
})

// dash.post("/guardar", (req, res)=> {
//     if(req.body.name){

//         let data ={
//             name : req.body.name
//         }

//         let metodo = "post";

//         if (req.body.id) {
//             data = {
//                 id: req.body.id,
//                 name : req.body.name
//             }
//             metodo = "put";
//         }


//        // let data = {name:req.body.name};
//         let ruta =  "http://localhost:3000/api/user";
        

//         let option = {
//             method : metodo,
//             headers:{
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(data)
//         }
//         try {
//             const result = fetch(ruta, option)
//             .then(res=>res.json())
//             .then(data=>
//                 console.log("Datos guardados"
//                 ))
//                 .catch(error => console.log("error al consumir la API" + err))
//                 res.redirect("/v1/user");
//         }catch(error){

//         }

//         res.send("se ha guardado")
//     }
// })

dash.get("/salir", (req, res) => {
    res.clearCookie("ckeib");
    res.redirect("/");
})

dash.get("/edit-user",(req, res)=>{
    const id = req.query.id;
    const name = req.query.name;

    let datos = {
        id: id,
        name: name
    }


    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)
            res.render("dash",{
                "nombre" : token.nombre,
                "foto" : token.foto,
                "menu" : 8,
                "datos" : datos
            })
        }catch(error){
            console.error("error con el token");
    }
}
})

dash.get("/borrar", async(req, res)=>{
    const id = req.query.id;
    if (req.cookies.ckeib){
        try {
            const token = jwt.verify(
            req.cookies.ckeib,
            process.env.SECRET_KEY)

            const url = `http://localhost:3000/api/user/${id}`;
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
            

            res.redirect("/v1/email")

        }catch(error){
            console.error("error con el token");
    }
    }
})



export default dash;