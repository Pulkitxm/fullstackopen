export interface DiagnosiseType {
  code:string,
  name:string,
  latin?:string,
}

export interface PatientType {
  id:string,
  name:string,
  dateOfBirth:string,
  gender:string,
  occupation:string,
}
export type NonSensitivePatientType = Omit<PatientType, "comment">;