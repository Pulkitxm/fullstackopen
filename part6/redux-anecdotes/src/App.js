import NewAnectdote from './components/NewAnecdote'
import DisplayAnectdote from './components/DisplayAnecdote'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'

import anecdoteService from './services/anecdote'
import { useDispatch, useSelector } from 'react-redux'

import {initialAnecdotes} from './reducers/anecdoteReducer'

const App = () => { 

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(initialAnecdotes())
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