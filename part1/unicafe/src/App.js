import './App.css';
import { useState } from 'react'

const Buttons = (props) => {
  return(
    <button onClick={props.handleclick}>
      {props.text}
    </button>
  )
}
const Statistics = (props) => {
  return(
    <>
      <p>{props.text} {props.value} </p>
    </>
  )
}

const App = () =>{
  const [Good , addGood] = useState(0)
  const [Neutral , addNeutral] = useState(0)
  const [Bad , addBad] = useState(0)

  //Variables
  const tot = (Good+Neutral+Bad)
  const avg = (Good - Bad)/tot
  const perc = Good/tot

  return(
    <>
      <h1>give feedack</h1>
      <div>
        <Buttons text='good' handleclick={()=>addGood(Good+1)} />
        <Buttons text='neutral' handleclick={()=>addNeutral(Neutral+1)} />
        <Buttons text='bad' handleclick={()=>addBad(Bad+1)} />
      </div>
      <h1>Statistics</h1>
      {/* <p>{'Good  ->'}  {Good}</p>
      <p>{'Neutral  ->'}  {Neutral}</p>
      <p>{'Bad  ->'}  {Bad}</p>
      <p>{'Average  ->'}  {avg}</p>
      <p>{'Positive  ->'}  {perc}</p> */}
      <Statistics text={'Good ->'} value={Good} />
      <Statistics text={'Neutral ->'} value={Neutral} />
      <Statistics text={'Bad ->'} value={Bad} />
      <Statistics text={'All ->'} value={tot} />
      <Statistics text={'Average ->'} value={avg} />
      <Statistics text={'Positive ->'} value={perc} />
    </>
  )
}

export default App;
