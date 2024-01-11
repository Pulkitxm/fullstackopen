import { NewPatientType,Gender } from "./types";

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (gender: string): boolean => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const nameParser = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name ");
  }
  return name;
};
const dateOfBirthParser = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const ssnParser = (ssn: unknown):string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn ");
  }
  return ssn;
};
const genderParser = (gender: unknown):string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error("Incorrect or missing name ");
    }
    return gender;
};
const occupationParser = (occupation:unknown):string => {
    if (!occupation || !isString(occupation)) {
      throw new Error("Incorrect or missing name ");
    }
    return occupation;
};

const toNewDiaryEntry = (object: unknown): NewPatientType => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    return {
      name: nameParser(object.name),
      dateOfBirth: dateOfBirthParser(object.dateOfBirth),
      ssn: ssnParser(object.ssn),
      gender: genderParser(object.gender),
      occupation: occupationParser(object.occupation),
      entries:[]
    };
  }
  throw new Error("Incorrect Data: some fields are missing");
};

export default toNewDiaryEntry;
