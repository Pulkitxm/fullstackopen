import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Pulkit', number:'+919654950988' , id: 1 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("91");

  const handlechange_person = (event) => {
    const name = event.target.value;
    setNewName(name);
    // console.log(name);
  }

  const handlechange_number = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  }
  const addperson = (event) => {
    event.preventDefault();

    const nameExists = persons.find((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} already exists in the phonebook!`);
    }
    else {
      const updatedPersons = [...persons, {
        name: newName,
        number:newNumber,
        id: newName.length
      }];
      setPersons(updatedPersons);
      setNewName('');
      console.log(updatedPersons);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handlechange_person} />
        </div>
        <div>
          number: <input value={newNumber} type={'number'} onChange={handlechange_number} />
        </div>
        <div>
          <button type="submit" onClick={addperson} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) =>
          <p key={person.id} >
            {person.name}
            &nbsp;
            {person.number}
          </p>
        )
      }
    </div>
  )
}

export default App