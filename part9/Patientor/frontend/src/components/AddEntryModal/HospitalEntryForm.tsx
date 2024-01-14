import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button } from '@mui/material';

interface Props {
  onCancel: () => void;
  onSubmit: (values:object) => void;
}

const HospitalEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [values, setValues] = useState({
    type: "",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    discharge: {
      date: "",
      criteria: ""
    },
  });

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const val = {
      type: values.type,
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes,
      dischargeDate: values.discharge.date,
      dischargeCriterio: values.discharge.criteria
    };
    onSubmit(val);
  };

  return (
    <div>
      <form style={{ padding: "1em 0", paddingBottom: "5em" }} onSubmit={addEntry}>
        <TextField
          style={{ margin: ".5em 0" }}
          label="Description"
          multiline
          fullWidth
          value={values.description}
          onChange={({ target }) => setValues({ ...values, description: target.value })}
        />
        <TextField
          style={{ margin: ".5em 0" }}
          label="Date"
          type="date"
          fullWidth
          value={values.date}
          onChange={({ target }) => setValues({ ...values, date: target.value })}
        />
        <TextField
          style={{ margin: ".5em 0" }}
          label="Specialist"
          fullWidth
          value={values.specialist}
          onChange={({ target }) => setValues({ ...values, specialist: target.value })}
        />
        <TextField
          style={{ margin: ".5em 0" }}
          label="DiagnosisCodes (you can add  multiple codes sperated by comma(,) "
          fullWidth
          value={values.diagnosisCodes}
          onChange={({ target }) => setValues({ ...values, diagnosisCodes: target.value.split(",") })}
        />
        <TextField
          style={{ margin: ".5em 0" }}
          label="DischargeDate"
          fullWidth
          type="date"
          value={values.discharge.date}
          onChange={({ target }) => setValues({ ...values, discharge: { ...values.discharge, date: target.value } })}
        />
        <TextField
          style={{ margin: ".5em 0" }}
          label="DischargeCriteria"
          fullWidth
          value={values.discharge.criteria}
          onChange={({ target }) => setValues({ ...values, discharge: { ...values.discharge, criteria: target.value } })}
        />

        <Grid style={{ margin: "1em 0" }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HospitalEntryForm;