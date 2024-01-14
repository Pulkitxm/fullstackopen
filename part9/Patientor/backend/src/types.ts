export interface DiagnosiseType {
  code:string,
  name:string,
  latin?:string,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosiseType["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;
  
export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}
export type NonSensitivePatientType = Omit<PatientType, "ssn" | "entries">;
export type NewPatientType = Omit<PatientType, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}