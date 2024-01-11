import { Router } from 'express';
import { getNonSensitivePatients } from "../services/patientServices";

const router = Router();

router.get("/", (_req, res) => {
    res.send(getNonSensitivePatients());
})

export default router;