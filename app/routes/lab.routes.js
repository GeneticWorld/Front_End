import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/lab.controllers.js";

dotenv.config();

const dashLaboratory = Router ();

dashLaboratory.get("/lab",controllers.viewLab);
dashLaboratory.post("/labeSave", controllers.saveLab);
dashLaboratory.get("/editLab", controllers.labEdit);
dashLaboratory.get("/deleteLab", controllers.labDelete);
dashLaboratory.post("/generatePdf", controllers.pdfGenerate);

export default dashLaboratory;


