import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Divider, Alert, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';

import { NewEntry } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [selectedEntryType, setSelectedEntryType] = useState('HospitalEntryForm');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEntryType(event.target.value);
  };

  const renderForm = () => {
    switch (selectedEntryType) {
      case 'HospitalEntryForm':
        return <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      case 'OccupationalHealthcareEntryForm':
        return <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      case 'HealthCheckEntryForm':
        return <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()} maxWidth="md" >
      <DialogTitle>Add a new Entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedEntryType}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="HospitalEntryForm" control={<Radio checked={selectedEntryType === 'HospitalEntryForm'} />} label="Hospital-Entry" />
            <FormControlLabel value="OccupationalHealthcareEntryForm" control={<Radio checked={selectedEntryType === 'OccupationalHealthcareEntryForm'} />} label="Occupational Healthcare-Entry" />
            <FormControlLabel value="HealthCheckEntryForm" control={<Radio checked={selectedEntryType === 'HealthCheckEntryForm'} />} label="Health Check-Entry" />
          </RadioGroup>

        </div>

        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
