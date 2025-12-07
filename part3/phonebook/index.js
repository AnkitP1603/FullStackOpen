import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(express.static("dist"))

morgan.token("body", (req,res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(">> :method :url :status :res[content-length] - :response-time ms | :body"))

app.use(cors())

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons",(req,res) => {
    res.status(200).json(data)
})

app.get("/api/info",(req,res) => {
    const date = new Date()
    res.status(200).send(`<p>Phonebook has info for ${data.length} people<p><p>${date}</p>`)
})

app.get("/api/persons/:id",(req,res) => {
    const id = req.params.id
    const person = data.find(person => person.id===id)
    if(person){
        res.status(200).json(person)
    }else{
        res.status(404).end()
    }
})

app.post("/api/persons",(req,res) => {
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error: "name or number is missing"
        })
    }

    const nameExists = data.find(person => person.name===body.name)
    if(nameExists){
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const id = Math.floor(Math.random()*10000).toString()
    const newPerson = {
        id: id,
        name: body.name,
        number: body.number
    }
    data = data.concat(newPerson)
    res.status(201).json(newPerson)
})

app.delete("/api/persons/:id",(req,res) => {
    const id = req.params.id
    const idx = data.findIndex(person => person.id===id)
    if(idx!==-1){
        data.splice(idx,1)
        res.status(204).end()
    }else{
        res.status(404).end()
    }
})

app.put("/api/persons/:id",(req,res) => {
    const id = req.params.id
    const body = req.body
    const person = data.find(person => person.id===id)
    if(person){
        person.number = body.number
        res.status(200).json(person)
    }else{
        res.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})