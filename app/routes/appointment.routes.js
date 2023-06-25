import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/appointment.controllers.js";

dotenv.config();

const dashAppointment = Router ();

dashAppointment.get("/viewAppointment", controllers.appointment);
dashAppointment.post("/appointSave", controllers.saveAppointment);
dashAppointment.get("/editA", controllers.editAppointment);
dashAppointment.get("/deleAppointment", controllers.deleteAppointment);
dashAppointment.post("/generatePdf", controllers.pdfGenerate);

export default dashAppointment;