import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
// import cors from 'cors'
import Person from "./models/person.js";

dotenv.config();

const app = express();

app.use(express.static("dist"));
app.use(express.json());
// app.use(cors())

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ">> :method :url :status :res[content-length] - :response-time ms | :body",
  ),
);

app.get("/api/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      res
        .status(200)
        .send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }

      person.name = body.name;
      person.number = body.number;

      return person.save().then((updatedPerson) => {
        res.status(200).json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
