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

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

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

// app.get('/' , (req,res,next) =>{
//     res.send("Hello")
// })

app.get('/info' , (req,res,next) =>{
    Person.find({}).then(person => {
        res.send(`<p>Phonebook has info for ${person.length} people</p>
        <p>${new Date()}</p>
        `)
    })
})

app.get('/api/persons',(req,res,next)=>{
    Person.find({}).then(person=>{
        res.json(person)
    }).catch(error => next(error))

})

app.get('/api/persons/:id', (request, response,next) => {
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
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response,next) => {
    const body = request.body

    const contact = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(request.params.id, contact, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


app.post('/api/persons', (req, res) => {
    const body = req.body
    // console.log(body.name,body.name.length!=0==true);
    // console.log(body.number,body.number.length!=0==true);
    // console.log(persons.filter(person => person.name === body.name),(persons.filter(person => person.name === body.name).length ===0)==true);
    console.log(!Person.find({ name: body.name }));
    if ((body.name.length != 0 ) &&
        (body.number.length != 0 ) 
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
    }
    const person = new Person(
        {
            name: body.name,
            number: body.number
        }
    )
    person.save()
        .then(savedPerson=>res.json(savedPerson))
        // .catch(error =>  next(error))
    

    // console.log(persons);
});



app.use(errorHandler)

const PORT = process.env.port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})