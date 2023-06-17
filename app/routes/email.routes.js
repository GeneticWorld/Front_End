import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/email.controllers.js";


dotenv.config();

const dashEmail = Router ();

dashEmail.get("/email", controllers.getEmail);
dashEmail.post("/saveEmail", controllers.save);
dashEmail.get("/delete", controllers.emailDelete);
dashEmail.get("/editEmail", controllers.emailEdit);


export default dashEmail;