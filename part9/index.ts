import express from 'express';
const app = express()

app.get("/", (_req, res) => {
    res.send("Hello Full Stack")
})

const PORT:number = 3000;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)  
})