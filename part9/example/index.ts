import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const result = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: "malformatted parameters" });
    }
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: "malformatted parameters" });
    }
    return res.status(400).json({ error: "unknown error" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
