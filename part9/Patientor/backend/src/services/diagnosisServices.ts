import diagnosisData from '../../data/diagnoses'

import {DiagnosiseType} from '../types'

const diaries: DiagnosiseType[] = diagnosisData as DiagnosiseType[]

export const getDiagnosis = () => {
    return diaries;
}