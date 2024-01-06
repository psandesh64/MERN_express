const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())
let students = [
    {
        id : 1,
        name : 'Bryan',
        age : 24
    },
    {
        id : 2,
        name : 'Saphire',
        age : 29
    },
    {
        id : 3,
        name : 'Koran',
        age : 25
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
app.use(unknownEndpoint)

app.get('/',(request,response)=>{
    response.send('<h1>This is my home page</h1>');
})
app.get('/students',(request,response) => {
    response.json(students)
})
app.get('/students/:id',(request,response) => {
    const id = Number(request.params.id)
    const student = students.find( data => data.id === id )
    student ? response.json(student) : response.status(404).end()
})
app.delete('/students/:id',(request,response) => {
    const id = Number(request.params.id)
    students = students.filter(data => data.id !== id)
    response.status(204).end()
})
app.post('/students',(request,response) => {
    const student = request.body
    students.push(student)
    response.json(student)
})

app.listen(PORT,() => console.log(`Server running on localhost:${PORT}`))