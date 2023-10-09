import NewAnectdote from './components/NewAnecdote'
import DisplayAnectdote from './components/DisplayAnecdote'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'

import anecdoteService from './services/anecdote'
import { useDispatch } from 'react-redux'

const App = () => { 

  const dispatch = useDispatch();

  useEffect(()=>{
    anecdoteService.getAll().then((res)=>{
      res.forEach(i => {
        dispatch({ type: 'anecdote/addAnectode', payload: i.content })
      });
    })
  },[])
   
  return (
    <div>
      <Notification/>
      <NewAnectdote/>
      <br/>
      <VisibilityFilter/>
      <DisplayAnectdote/>
    </div>
  )
}

export default App