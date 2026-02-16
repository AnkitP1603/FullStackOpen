import express, { Response } from "express";
import patientService from "../services/patientService";
import { NonSensitivePatient } from "../types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getAll());
});

export default patientsRouter;