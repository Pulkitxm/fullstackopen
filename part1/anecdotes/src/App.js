import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const Buttons = (props) => {
    return (
      <button onClick={props.handleclick}>
        {props.text}
      </button>
    )
  }
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const addVote = () => {
    const newPoints = [...points]; //copyng arrays
    //another way is ->  const newPoints = points.slice(0, points.length);
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  const generateRandomNum = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  };


  const [selected, setSelected] = useState(0)
  // console.log(points)
  return (
    <>
      {anecdotes[selected]}
      <br />
        points -> {points[selected]}
      <br />
      <Buttons text='vote' handleclick={addVote} />
      <Buttons text='next' handleclick={generateRandomNum} />
    </>
  )
}

export default App