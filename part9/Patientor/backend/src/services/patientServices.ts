import patientsData from "../../data/patients";

import { PatientType, NonSensitivePatientType } from "../types";

const patients: PatientType[] = patientsData as PatientType[];

export const getPatients = (): PatientType[] => {
  return patients;
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