import NewAnectdote from './components/NewAnecdote'
import DisplayAnectdote from './components/DisplayAnecdote'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

const App = () => {  
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