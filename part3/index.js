let persons = [
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

app.use(express.json())

app.get('/' , (req,res) =>{
    res.send("Hello")
})

app.get('/info' , (req,res) =>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date()}</p>
    `)
})

app.get('/api/persons',(req,res)=>{
    res.send(persons)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id);
    const person = persons.filter(n=>n.id===id);
    // if (person){
    if (person.length===0){
        res.status(404).end()
    }else{
        res.json(person);
    }
    
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id);
    const person = persons.filter(person=>person.id===id);
    persons = persons.filter(person=>person.id!==id);
    console.log(person);
    res.status(204).end()
})

const generateId = () => Number((Math.random() * 10000000000000000).toFixed(0));

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
});

app.listen(3001)