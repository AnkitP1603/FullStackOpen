import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let avg = (good - bad) / all;
  let pos = (good / all) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={pos + " %"} />
      </tbody>
    </table>
  );
};

const Button = ({ text, count, setter }) => (
  <button onClick={() => setter(count + 1)}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button count={good} setter={setGood} text="good" />
        <Button count={neutral} setter={setNeutral} text="neutral" />
        <Button count={bad} setter={setBad} text="bad" />
      </div>

      <div>
        <h1>Statistics</h1>
        {good + neutral + bad != 0 ? (
          <Statistics good={good} neutral={neutral} bad={bad} />
        ) : (
          <p>No feedback given</p>
        )}
      </div>
    </div>
  );
};

export default App;
