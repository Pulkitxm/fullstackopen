import { useState } from 'react'
import {
  useMatch,Routes,Route
} from 'react-router-dom'

//Components
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'

//Custom hooks
import {useField} from './hooks/index'

const App = () => {

  const author = useField("text")
  const content = useField("text")
  const info = useField("text")
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const id = match?match.params.id:null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {
        notification?
          <div>
            {notification}
          </div>
        :
          <></>
      }
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdotes.filter(anecdote=>anecdote.id == id)[0]} />} />
        <Route path='/createnew' element={
          <CreateNew 
            addNew={addNew} 
            setNotification={setNotification} 
            author={author}
            content={content}
            info={info}
          />
        } />
        <Route path='/about' element={<About/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
