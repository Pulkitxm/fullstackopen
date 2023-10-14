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
  // console.log(props.data)
  if ( (props.data[0] + props.data[1] + props.data[2]) !==0){
    //Variables
    const tot = ( props.data[0]+ props.data[1]+ props.data[2])
    const avg = ( props.data[0] -  props.data[2] ) / tot
    const perc =  props.data[0] / tot
    return(
      <>
       <table>
          <tbody>
            <Statistic data={'Good '} value={props.data[0]} />
            <Statistic data={'Neutral '} value={props.data[1]} />
            <Statistic data={'Bad '} value={props.data[2]} />
            <Statistic data={'All '} value={tot} />
            <Statistic data={'Average '} value={avg} />
            <Statistic data={'Positive '} value={perc} />
          </tbody>
       </table>
      </>
    )
  }
  else{
    return(
      <p>
          No feedback given
      </p>
    )
  }
}
const Statistic = (props) => {
  return(
      <tr>
        <th>{props.data}</th>
        <td>{props.value}</td>
      </tr>
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
      <Statistics data={[Good,Neutral,Bad]} />
    </>
  )
}

export default App;
