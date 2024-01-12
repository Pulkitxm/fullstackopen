import { Router } from 'express';
import {
  getDiagnosis,
  getDiagnosisByCode,
} from "../services/diagnosisServices";
const router = Router();

router.get("/", (_req, res) => {
    res.send(getDiagnosis());
})

router.get("/:code", (req, res) => {
    const { code }:{code:string} = req.params;
    if (code) {
        res.send(getDiagnosisByCode(code));
    } else {
        throw new Error("Invalid code");
    }
})

export default router;