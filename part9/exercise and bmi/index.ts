import express from 'express';

const app = express()
app.use(express.json());

import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator, result } from "./exerciseCalculator";


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

// {
//   "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
//   "target": 2.5
// }

// {
//     "periodLength": 7,
//     "trainingDays": 4,
//     "success": false,
//     "rating": 1,
//     "ratingDescription": "bad",
//     "target": 2.5,
//     "average": 1.2142857142857142
// }

app.post("/exercise", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
        if (!target || !exerciseCalculator || daily_exercises.length != 7) {
            return res.status(400).send({
                error:"Invalid data sent"
            })
        }
        const resp:result|void = exerciseCalculator(daily_exercises, target);
        return res.send(resp);
    } catch (err) {
        return res.status(404).json({
            "error": err.message
        })
    }
})

const PORT:number = 3003;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)  
})