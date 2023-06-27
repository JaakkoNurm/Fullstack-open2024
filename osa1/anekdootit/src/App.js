import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [points, setPoints] = useState(new Uint8Array(8))
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    console.log("Selecting next anecdote. Current: ", selected)
    setSelected(Math.floor(Math.random() * 8))

  }

  console.log("Points currently: ", points)

  const voteAnecdote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)

    console.log("Points after voting", points)
  }

  const MostVoted = ({points}) => {
    let bestIndex = 0;
    let largestInt = points[0];

    for (let i=1; i<=points.length; i++) {
        if(points[i] > largestInt) {
          largestInt = points[i]
          bestIndex = i
        }
    }
      console.log("Most voted anecdote is:", anecdotes[bestIndex])
      return (
        <p>{anecdotes[bestIndex]} has {largestInt} votes</p>
      )
  }

  return (
    <div>
      <h1>Ancedote of the day</h1>
      {anecdotes[selected]}
      <br />
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={nextAnecdote} text="Next anecdote" />

      <h1>Anecdote with most votes</h1>
      <MostVoted points={points} />
      

    </div>
  )
}

export default App