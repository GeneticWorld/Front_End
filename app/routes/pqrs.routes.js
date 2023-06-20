import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/pqrs.controllers.js";


dotenv.config();

const dashpqrs = Router ();

dashpqrs.get("/viewpqrs", controllers.getpqrs);
dashpqrs.post("/pqrsSave", controllers.savePQRS);
dashpqrs.get("/deletePqrs", controllers.pqrsDelete);

export default dashpqrs;