// Modulos
import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/appointment.controllers.js";
import { validateCreate } from "../validators/appointment.js";

dotenv.config();

const dashAppointment = Router ();

// Ruta para mostrar la información
dashAppointment.get("/viewAppointment", controllers.appointment);

// Ruta para insertar datos
dashAppointment.post("/appointSave", validateCreate, controllers.saveAppointment);

// Ruta para actualizar infromación
dashAppointment.get("/editA", controllers.editAppointment);

// Ruta para eliminar información
dashAppointment.get("/deleAppointment", controllers.deleteAppointment);

// Ruta para crear el PDF
dashAppointment.post("/generatePdf", controllers.pdfGenerate);

export default dashAppointment;