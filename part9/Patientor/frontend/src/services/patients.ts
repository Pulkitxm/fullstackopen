import axios from "axios";
import { Patient, PatientFormValues, Diagnosis } from "../types";

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
  const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnosis/${code}`);
  const res: Diagnosis = data as Diagnosis;
  return res;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
  getById,
  getDiagnosisByCode,
};
