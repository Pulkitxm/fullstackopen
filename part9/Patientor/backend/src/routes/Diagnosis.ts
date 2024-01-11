import { Router } from 'express';
import { getDiagnosis } from "../services/diagnosisServices";
const router = Router();

router.get("/", (_req, res) => {
    res.send(getDiagnosis());
})

export default router;