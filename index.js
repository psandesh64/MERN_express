const http = require('http')

let notes = [
    {
    id:1,
    content: "HTML is easy.",
    important: true,
    },
    {
    id:2,
    content: "Browser can execute only javascript.",
    important: true,
    },
    {
    id:3,
    content: "GET and POST are the most important method of HTTP protocol.",
    important: true,
    },  
]

const app = http.createServer((request,response) => {
    response.writeHead(200, { 'Content-type':'application/json' })
    response.end(JSON.stringify(notes))
})
const PORT = 3001
app.listen(PORT)

console.log(`Server running on port localhost/${PORT}`)