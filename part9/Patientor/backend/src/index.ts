import express from "express";
import diagnosisRouter from './routes/Diagnosis'
import patientsRouter from './routes/Patients'
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnosis",diagnosisRouter)
app.use("/api/patients",patientsRouter)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
