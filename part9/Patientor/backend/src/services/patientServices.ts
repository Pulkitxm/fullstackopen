import patientsData from "../../data/patients";
import { v4 as uuid } from "uuid";
import { PatientType, NonSensitivePatientType, NewPatientType } from "../types";

const patients: PatientType[] = patientsData as PatientType[];

export const getPatients = (): PatientType[] => {
  return patients;
};

export const getPatient = (id:string): PatientType => {
  const pt = patients.filter(patient=>patient.id===id)[0] as PatientType;
  return pt;
};

export const getNonSensitivePatients = (): NonSensitivePatientType[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (object: NewPatientType) => {
  const data = {...object,id:uuid()} as PatientType;
  patientsData.push(data);
  return data;
};