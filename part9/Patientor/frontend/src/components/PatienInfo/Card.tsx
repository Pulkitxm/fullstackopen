import ListItem from './List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Gender } from '../../types';
type Props = {
    name: string,
    ssn: string,
    occupation: string,
    gender: Gender,
    entries: []
};
export default function BasicCard(props: Props) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h3" component="div">
                    {props.name} {
                        props.gender === 'male' ?
                            <MaleIcon style={{ transform: 'scale(2) translateY(-3px)' }} />
                            :
                            props.gender === 'female' ?
                                <FemaleIcon style={{ transform: 'scale(2) translateY(-3px)' }} />
                                :
                                <TransgenderIcon style={{ transform: 'scale(2) translateY(-3px)' }} />
                    }
                </Typography>
                <br />
                <Typography variant="h5">
                    ssn: {props.ssn}
                    <br />
                    occupation: {props.occupation}
                </Typography>
                <Typography>
                    <h2>
                        Entries
                    </h2>
                    {
                        props.entries.map((i, idx) => {
                            {
                                return (
                                    <ListItem list={i} key={idx} />
                                );
                            }
                        })
                    }
                </Typography>
            </CardContent>
        </Card>
    );
}
