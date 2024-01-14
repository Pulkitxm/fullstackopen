import axios from "axios";
import { Patient, PatientFormValues, Diagnosis, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const getDiagnosisByCode = async (code: string) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnosis/${code}`
  );
  const res: Diagnosis = data as Diagnosis;
  return res;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, object:object) => {
  console.log(`${apiBaseUrl}/patients/${id}/entries`);
  console.log(object);
  try {
    const { data } = await axios.post<NewEntry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );
    return data;
  } catch (err) {
    console.log(err?.message);
    return err?.message;
  }
};

export default {
  getAll,
  create,
  getById,
  getDiagnosisByCode,
  addEntry,
};
