import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/appointment.controllers.js";

dotenv.config();

const dashAppointment = Router ();

dashAppointment.get("/viewAppointment", controllers.appointment)

export default dashAppointment;