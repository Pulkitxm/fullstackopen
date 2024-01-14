import { useState,useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Entry,Diagnosis } from '../../types';
import services from '../../services/patients';
export default function VirtualizedList({ list }: { list: Entry }) {

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    useEffect(() => {
        const fetchDiagnoses = async () => {
            const newDiagnosisPromises = list.diagnosisCodes?.map(async (i) => {
                const res = await services.getDiagnosisByCode(i);
                return res;
            }) || [];
            const newDiagnosis = await Promise.all(newDiagnosisPromises);
            setDiagnosis(newDiagnosis);

        };
        fetchDiagnoses();
    }, []);

    
    switch (list.type) {
        case "OccupationalHealthcare":
            return (<ListItem style={{ height: "200px", width: "100%" }} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText  >
                        Description: {`${list.description}`}
                        <br />
                        Date: {`${list.date}`}
                        <br />
                        Specialist: {`${list.specialist}`}
                        <br />
                        Employer Name: {`${list.employerName}`}
                        <br />
                        {
                            diagnosis && <>
                                Diagnosis Codes: {diagnosis[0]?.map((a) => (a.name + " "))}
                            </>
                        }
                        <br />
                        Sick-Leave: {list.sickLeave?.startDate} - {list.sickLeave?.endDate}
                    </ListItemText>
                </ListItemButton>
            </ListItem>);
        case "Hospital":
            return (<ListItem style={{ height: "200px", width: "100%" }} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText  >
                        Description: {`${list.description}`}
                        <br />
                        Date: {`${list.date}`}
                        <br />
                        Specialist: {`${list.specialist}`}
                        <br />
                        {
                            diagnosis && <>
                                Diagnosis Codes: {diagnosis[0]?.map((a) => (a.name + " "))}
                            </>
                        }
                        <br />
                        Discharge:
                        <br />
                        Date- {list.discharge.date}
                        <br />
                        Criteria:{list.discharge.criteria}
                    </ListItemText>
                </ListItemButton>
            </ListItem>);
        case "HealthCheck":
            return (<ListItem style={{ height: "200px", width: "100%" }} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText  >
                        Description: {`${list.description}`}
                        <br />
                        Date: {`${list.date}`}
                        <br />
                        Specialist: {`${list.specialist}`}
                        <br />
                        {
                            diagnosis && <>
                                Diagnosis Codes: {diagnosis[0]?.map((a) =>( a.name + " "))}
                            </>
                        }
                        <br />
                        Health Check Rating: {list.healthCheckRating}
                    </ListItemText>
                </ListItemButton>
            </ListItem>);
        default:
            throw new Error("Invalid Entry");
    }
}
