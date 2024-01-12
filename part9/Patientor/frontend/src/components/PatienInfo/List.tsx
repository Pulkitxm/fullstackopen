import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Entry } from '../../types';
export default function VirtualizedList({ list }: { list: Entry }) {
    switch (list.type) {
        case "OccupationalHealthcare":
            return (<ListItem style={{ height: "200px", width: "100%" }} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText  >
                        Description: {`${list.description}`}
                        <br />
                        Date: {`${list.date}`}
                        <br />
                        Type: {`${list.type}`}
                        <br />
                        Specialist: {`${list.specialist}`}
                        <br />
                        Employer Name: {`${list.employerName}`}
                        <br />
                        Diagnosis Codes: {list.diagnosisCodes?.reduce((a, b) => a + ", " + b)}
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
                        Type: {`${list.type}`}
                        <br />
                        Specialist: {`${list.specialist}`}
                        <br />
                        Diagnosis Codes: {list.diagnosisCodes?.reduce((a, b) => a + ", " + b)}
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
                        Type: {`${list.type}`}
                        <br />
                        Specialist: {`${list.specialist}`}
                        <br />
                        Diagnosis Codes: {list.diagnosisCodes?.reduce((a, b) => a + ", " + b)}
                        <br />
                        Health Check Rating: {list.healthCheckRating}
                    </ListItemText>
                </ListItemButton>
            </ListItem>);
        default:
            throw new Error("Invalid Entry");
    }
}
