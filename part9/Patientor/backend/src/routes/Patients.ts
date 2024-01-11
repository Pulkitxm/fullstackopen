import { Router } from "express";
import {
  getNonSensitivePatients,
  addPatient,
  getPatient,
} from "../services/patientServices";
import toNewDiaryEntry from "../utils";

const router = Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const {id}:{id:string} = req.params;
  res.send(getPatient(id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewDiaryEntry(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (err: unknown) {
    let errMessage:string = "Something went wrong";
    if (err instanceof Error) { 
      errMessage += "Error: "+err.message;
    }
    res.status(400).send({
      error:errMessage
    })
  }
});

export default router;
