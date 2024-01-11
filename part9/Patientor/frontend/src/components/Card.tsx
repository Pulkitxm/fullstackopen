import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Gender } from '../types';
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

type Props = {
    name: string,
    ssn: string,
    occupation: string,
    gender: Gender,
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
            </CardContent>
        </Card>
    );
}
