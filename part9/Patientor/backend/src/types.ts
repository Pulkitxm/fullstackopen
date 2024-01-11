export interface DiagnosiseType {
  code:string,
  name:string,
  latin?:string,
}

export interface Entry {}

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