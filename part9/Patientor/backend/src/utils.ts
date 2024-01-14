import { NewPatientType, Gender, NewEntry, HealthCheckRating } from "./types";

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};
const isStringArr = (arr: unknown): arr is string[] => {
  if (Array.isArray(arr)) {
    for (const element of arr) {
      if (typeof element !== "string") {
        return false;
      }
    }
    return true;
  }
  return false;
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
const ssnParser = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn ");
  }
  return ssn;
};
const genderParser = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing name ");
  }
  return gender;
};
const occupationParser = (occupation: unknown): string => {
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
      entries: [],
    };
  }
  throw new Error("Incorrect Data: some fields are missing");
};

const descriptionParser = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description ");
  }
  return description;
};
const dateParser = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date ");
  }
  return date;
};
const specialistParser = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist ");
  }
  return specialist;
};
const diagnosisCodesParser = (diagnosisCodes: unknown): string[] => {
  if (!diagnosisCodes || !isStringArr(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosisCodes ");
  }
  return diagnosisCodes;
};
const dischargeDateParser = (dischargeDate: unknown): string => {
  if (!dischargeDate || !isString(dischargeDate)) {
    throw new Error("Incorrect or missing dischargeDate ");
  }
  return dischargeDate;
};
const dischargeCriterioParser = (dischargeCriterioParser: unknown): string => {
  if (!dischargeCriterioParser || !isString(dischargeCriterioParser)) {
    throw new Error("Incorrect or missing dischargeCriterio ");
  }
  return dischargeCriterioParser;
};
const employerNameParser = (employerNameParser: unknown): string => {
  if (!employerNameParser || !isString(employerNameParser)) {
    throw new Error("Incorrect or missing employerName ");
  }
  return employerNameParser;
};
const sickLeaveStartParser = (sickLeaveStart: unknown): string => {
  if (!sickLeaveStart || !isString(sickLeaveStart)) {
    throw new Error("Incorrect or missing sickLeaveStart ");
  }
  return sickLeaveStart;
};
const sickLeaveEndParser = (sickLeaveEnd: unknown): string => {
  if (!sickLeaveEnd || !isString(sickLeaveEnd)) {
    throw new Error("Incorrect or missing sickLeaveEnd ");
  }
  return sickLeaveEnd;
};
const healthCheckRatingParser = (
  healthCheckRatingParser: unknown
): HealthCheckRating => {
  if (!healthCheckRatingParser || !isString(healthCheckRatingParser)) {
    throw new Error("Incorrect or missing healthCheckRating ");
  }
  const val = healthCheckRatingParser as unknown as HealthCheckRating;
  return val;
};

const toNewEntry = (body: {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  dischargeDate: unknown;
  dischargeCriterio: unknown;
  employerName: unknown;
  sickLeaveStart: unknown;
  sickLeaveEnd: unknown;
  healthCheckRating: unknown;
}): NewEntry | undefined => {
  const description = descriptionParser(body.description);
  const date = dateParser(body.date);
  const specialist = specialistParser(body.specialist);
  const diagnosisCodes = diagnosisCodesParser(body.diagnosisCodes);
  
  if (!description && !date && !specialist && !diagnosisCodes) {
    throw new Error("Information is incomplete");
  }

  const t1 = body.dischargeDate && body.dischargeCriterio;
  const t2 = body.employerName && body.sickLeaveStart && body.sickLeaveEnd;
  const t3 = body.healthCheckRating;
  
  if (!(t1 || t2 || t3)) {
    throw new Error("Information provided doesn't fall under any Entry type");
  }

  const baseObject = {
    description,
    date,
    specialist,
    diagnosisCodes: diagnosisCodes,
  };
  if (t1) {
    const dischargeDate = dischargeDateParser(body.dischargeDate);
    const dischargeCriterio = dischargeCriterioParser(body.dischargeCriterio);
    return {
      ...baseObject,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriterio,
      },
    };
  } else if (t2) {
    const employerName = employerNameParser(body.employerName);
    const sickLeaveStart = sickLeaveStartParser(body.sickLeaveStart);
    const sickLeaveEnd = sickLeaveEndParser(body.sickLeaveEnd);
    return {
      ...baseObject,
      type: "OccupationalHealthcare",
      employerName: employerName,
      sickLeave: {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      },
    };
  } else if (t3) {
    const healthCheckRating = healthCheckRatingParser(body.healthCheckRating);
    return {
      ...baseObject,
      type: "HealthCheck",
      healthCheckRating: healthCheckRating,
    };
  }

  return;
};

export default {
  toNewDiaryEntry,
  toNewEntry,
};
