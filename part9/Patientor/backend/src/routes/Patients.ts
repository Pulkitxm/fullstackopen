import { Router } from "express";
import {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  getEntry,
  addEntry,
} from "../services/patientServices";
import utils from "../utils";
import { NewEntry } from "../types";
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
    const newPatient = utils.toNewDiaryEntry(req.body);
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

router.get("/:id/entries", (req, res) => {
  try {
    const { id } = req.params;
    res.send(getEntry(id));
  } catch (err: unknown) {
    let errMessage: string = "Something went wrong";
    if (err instanceof Error) {
      errMessage += "Error: " + err.message;
    }
    res.status(400).send({
      error: errMessage,
    });
  }
});

//test examples

// {
//     "description":"This is a test entry",
//     "date":"2024-01-14",
//     "specialist":"Pulkit",
//     "diagnosisCodes":["M24.2"],
//     "dischargeDate":"2024-01-11",
//     "dischargeCriterio":"Pain freed"
// }

// {
//     "description":"This is a test entry",
//     "date":"2024-01-14",
//     "specialist":"Pulkit",
//     "diagnosisCodes":["M24.2"],
//     "employerName":"Pulkit",
//     "sickLeaveStart":"2024-01-01",
//     "sickLeaveEnd":"2024-01-11"
// }

// {
//     "description":"This is a test entry",
//     "date":"2024-01-14",
//     "specialist":"Pulkit",
//     "diagnosisCodes":["M24.2"],
//     "healthCheckRating":""
// }

router.post("/:id/entries", (req, res) => {
  console.log("post");
  try {
    const { id } = req.params;
    const body = req.body;
    const object: NewEntry = utils.toNewEntry(body) as NewEntry;
    const addedPatient = addEntry(id,object);
    res.json(addedPatient);
    
  } catch (err: unknown) {
    let errMessage: string = "Something went wrong";
    if (err instanceof Error) {
      errMessage += "Error: " + err.message;
    }
    console.log(errMessage);
    res.status(400).send({
      error: errMessage,
    });
  }
});

export default router;
