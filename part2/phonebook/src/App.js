import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Pulkit' }
  ])

  const [newPerson, addnewPerson] = useState([
    'Jhon Doe'
  ])

  const addPerson = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newPerson }));
    addnewPerson("");
    // console.log(persons)
    // setPersons(persons.concat({ name: newPerson }))
    // addnewPerson('')
  }
  
  const handlenewchanges = (event) => {
    // console.log(event.target.value)
    addnewPerson(event.target.value)
    addnewPerson(event.target.value)
    // console.log(newPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newPerson} onChange={handlenewchanges} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
          <p key={person.name}>{person.name}</p> 
      ))}
      
      {/* {console.log(persons)} */}
    </div>
  )
}

export default App