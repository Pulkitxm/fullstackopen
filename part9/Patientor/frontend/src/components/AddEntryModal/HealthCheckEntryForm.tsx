import { useState, SyntheticEvent } from "react";
import {
  TextField, Grid, Button, InputLabel, Select, MenuItem
} from '@mui/material';
import { HealthCheckRating } from '../../types';
interface Props {
  onCancel: () => void;
  onSubmit: (values: object) => unknown;
}

const HospitalEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [values, setValues] = useState({
    type: "",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    healthCheckRating: ""
  });

  const handleChange = (event: SyntheticEvent) => {
    setValues({ ...values, healthCheckRating: event.target.value });
  };
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const val = {
      type: values.type,
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes,
      healthCheckRating: values.healthCheckRating,
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
          fullWidth
          type="date"
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
        <InputLabel id="demo-simple-select-autowidth-label">Health Check rating</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={values.healthCheckRating}
          onChange={handleChange}
          fullWidth
          label="Health Check rating"
        >
          <MenuItem value="">
          </MenuItem>
          {
            Object.entries(HealthCheckRating).slice(Math.ceil(Object.entries(HealthCheckRating).length / 2)).map(i => {
              return <MenuItem value={i[1]}>{i[0]}</MenuItem>;
            })
          }
        </Select>

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