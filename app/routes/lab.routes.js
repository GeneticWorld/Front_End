import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/lab.controllers.js";

dotenv.config();

const dashLaboratory = Router ();

dashLaboratory.get("/lab",controllers.viewLab);


export default dashLaboratory;


