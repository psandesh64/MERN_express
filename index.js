const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())
let phonebook = [
    {
        id : 1,
        name : 'Arto Hellas',
        number : 9856325612
    },
    {
        id : 2,
        name : 'Ada Lovelace',
        number : 9856893265
    },
    {
        id : 3,
        name : 'Dan Abranov',
        number : 9854785632
    },
]
const requestLogger = (request,response,next) => {
    console.log('Method',request.method);
    console.log('Path',request.path);
    console.log('Body',request.body);
    console.log('----------------------');
    next();
}
app.use(requestLogger)

const unknownEndpoint = (request,response) => {
    response.status(404).send({error:'unknown endpoint'})
}


app.get('/',(request,response)=>{
    response.send('<h1>This is my home page</h1>');
})
app.get('/api/persons',(request,response) => {
    response.json(phonebook)
})
app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    const person = phonebook.find( data => data.id === id )
    student ? response.json(person) : response.status(404).end()
})
app.delete('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(data => data.id !== id)
    response.status(204).end()
})
app.post('/api/persons',(request,response) => {
    const person = request.body
    person.id = Math.round(Math.random()*1000)
    phonebook.push(person)
    response.status(200).send('Data Added')
})
app.use(unknownEndpoint)

app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`))