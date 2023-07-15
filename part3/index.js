let notes = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const express = require("express")
const app = express()

app.get('/' , (req,res) =>{
    res.send("Hello")
})

app.get('/info' , (req,res) =>{
    res.send(`<p>Phonebook has info for ${notes.length} people</p>
              <p>${new Date()}</p>
    `)
})

app.get('/api/persons',(req,res)=>{
    res.send(notes)
})

app.listen(3001)