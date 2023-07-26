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
const mongoose = require('mongoose')
const express = require("express")
const app = express()
var morgan = require('morgan')
app.use(express.static('build'))
require('dotenv').config()

const Person = require('./models/Person')

// morgan(function (tokens, req, res) {
//     return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'), '-',
//         tokens['response-time'](req, res), 'ms'
//     ].join(' ')
// });

app.use(express.json())
// app.use(morgan())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :req-body'));

const url = process.env.url;

// app.get('/' , (req,res) =>{
//     res.send("Hello")
// })

app.get('/info' , (req,res) =>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date()}</p>
    `)
})

app.get('/api/persons',(req,res)=>{
    Person.find({}).then(person=>{
        res.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.put('/api/person/:id', (request, response,next) => {
    const body = request.body

    const person = new Person(
        {
            content: body.content,
            important: body.important,
        }
    )

    Note.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    // console.log(body.name,body.name.length!=0==true);
    // console.log(body.number,body.number.length!=0==true);
    // console.log(persons.filter(person => person.name === body.name),(persons.filter(person => person.name === body.name).length ===0)==true);
    if ((body.name.length != 0 ) &&
        (body.number.length != 0 ) &&
        // (persons.filter(person => person.name === body.name).length === 0)
        (persons.filter(person => person.name === body.name).length === 0)
    ) {
        const person = new Person(
            {
                name: body.name,
                number: body.number
            }
        )
        
        person.save().then(svaedPerson=>res.json(svaedPerson))

    }else if (!body.name && !body.number){
        return res.status(400).json({
            error: 'name and number missing'
        })
    }else if (!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }else if (!body.number){
        return res.status(400).json({
            error: 'number missing'
        })
    }else{
        return res.status(400).json({
            error: 'duplicate items'
        })
    }
    // console.log(persons);
});

const PORT = process.env.port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})