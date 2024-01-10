import express from 'express';
const app = express()

import { bmiCalculator } from './bmiCalculator';

app.get("/", (_req, res) => {
    res.send("Hello Full Stack");
})

app.get("/bmi", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { weight, height } = req.query;
        if (isNaN(Number(weight)) || isNaN(Number(height))) {
            throw new Error("Invalid Data")
        }
        const bmi: string = bmiCalculator(Number(weight), Number(height));
        res.json({
            height,
            weight,
            bmi
        });
    } catch (err) {
        res.status(404).json({
            "error": err.message
        })
    }
})

const PORT:number = 3003;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)  
})