import diagnosisData from '../../data/diagnoses'

import {DiagnosiseType} from '../types'

const diagnosis: DiagnosiseType[] = diagnosisData as DiagnosiseType[]

export const getDiagnosis = () => {
    return diagnosis;
}

export const getDiagnosisByCode = (code:string) => {
    return diagnosis.filter(i=>i.code==code);
}