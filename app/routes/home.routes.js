import { Router } from "express";

const route = Router();

// Ruta pagina principal 

route.get("/", (req, res) => {
    res.render("index");
});

export default route;