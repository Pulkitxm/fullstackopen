export interface DiagnosiseType {
  code:string,
  name:string,
  latin?:string,
}

export interface PatientType {
  id:string,
  name:string,
  dateOfBirth:string,
  ssn:string,
  gender:string,
  occupation:string,
}
export type NonSensitivePatientType = Omit<PatientType, "ssn">;
export type NewPatientType = Omit<PatientType, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}