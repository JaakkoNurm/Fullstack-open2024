import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({bad, neutral, good}) => {
  const total = bad+neutral+good
  const average = (good-bad)/total
  const positive = (good/total)*100

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  } 

  return ( 
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />

        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log("Increasing, goods before:", good)
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    console.log("Increasing, neutrals before:", neutral)
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    console.log("Increasing, bads before:", bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />

      <h1>statistics</h1>
      <Statistics bad={bad} neutral={neutral} good={good} />

    </div>
  )
}

export default App