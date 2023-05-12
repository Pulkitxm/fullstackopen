import './App.css';
import { useState } from 'react'

const Buttons = (props) => {
  return(
    <button onClick={props.handleclick}>
      {props.text}
    </button>
  )
}

const App = () =>{
  const [Good , addGood] = useState(0)
  const [Neutral , addNeutral] = useState(0)
  const [Bad , addBad] = useState(0)

  return(
    <>
      <h1>give feedack</h1>
      <div>
        <Buttons text='good' handleclick={()=>addGood(Good+1)} />
        <Buttons text='neutral' handleclick={()=>addNeutral(Neutral+1)} />
        <Buttons text='bad' handleclick={()=>addBad(Bad+1)} />
      </div>
      <h1>Statistics</h1>
      <p>{'Good  ->'}  {Good}</p>
      <p>{'Neutral  ->'}  {Neutral}</p>
      <p>{'Bad  ->'}  {Bad}</p>
    </>
  )
}

export default App;
