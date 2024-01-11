import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import patientServices from '../services/patients';
import { Gender } from '../types';
import Card from './Card';

const PatientInfo = () => {
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams<{id:string}>();
    useEffect(() => {
        (async () => {
            const x = id as string;
            const a: Patient = await patientServices.getById(x) as Patient;
            setPatient(a);
        })();
    },[]);

    if (patient) {
        const name = patient.name as string;
        const ssn = patient.ssn as string;
        const occupation = patient.occupation as string;
        const gender = patient.gender as Gender;
        return (
            <div>
                <Card name={name} ssn={ssn} occupation={occupation} gender={gender} />
            </div>
        );
    } else {
        return <>
            Patient not found
        </>;
    }
};
export default PatientInfo;