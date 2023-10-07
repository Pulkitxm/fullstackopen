import NewAnectdote from './components/NewAnecdote'
import DisplayAnectdote from './components/DisplayAnecdote'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {  
  return (
    <div>
      <NewAnectdote/>
      <br/>
      <VisibilityFilter/>
      <DisplayAnectdote/>
    </div>
  )
}

export default App