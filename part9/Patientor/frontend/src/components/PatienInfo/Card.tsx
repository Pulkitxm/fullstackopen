import { useState } from 'react';
import ListItem from './List';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddEntryModal from '../AddEntryModal/index';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Gender, NewEntry } from '../../types';
import services from '../../services/patients';
type Props = {
    name: string,
    ssn: string,
    occupation: string,
    gender: Gender,
    id: string,
    entries: []
};
export default function BasicCard(props: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError("");
    };
    const submitEntry = async (values: object) => {
        if (props.id)
            await services.addEntry(props.id,values);
    };
    return (
        <Card sx={{ minWidth: 275,margin:"1em 0" }}>
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
                    {error && <Alert severity="error">{error}</Alert>}
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitEntry}
                        error={error}
                        onClose={closeModal}
                    />
                    <Button variant="contained" color="success" onClick={() => openModal()}>
                        Add Entry
                    </Button>
                </Typography>
            </CardContent>
        </Card>
    );
}
