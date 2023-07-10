import { useState } from 'react'

const Filter = ({updatedpersons}) => updatedpersons.map((person) => (
                      <div key={person.id}>
                        {person.name} {person.number}
                      </div>
                    ))

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Pulkit', number:'+919654950988' },
    { name: 'Naman Dadich', number:'+919999487463' },
    { name: 'Rishabh Verma', number:'+918383905530' },
    { name: 'Divyansh Arora', number:'+918595995023' },
    { name: 'Ayush Goyal', number:'+919560147344' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("91");
  const [search, setSearch] = useState("");

  const handlechange_person = (event) => {
    const name = event.target.value;
    setNewName(name);
    // console.log(name);
  }
  const handlechange_number = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  }
  const handlechange_search = (event) => {
    const query = event.target.value;
    setSearch(query);
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
        number:newNumber
      }];
      setPersons(updatedPersons);
      setNewName('');
      console.log(updatedPersons);
    }
  }
  let updatedpersons = persons.filter(person => person.name.includes(search))
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label htmlFor="filter">filter shown with:</label>
          <input type="text" value={search} onChange={handlechange_search} id='filter' />
        </div>
        <h3>add a new</h3>
        <div>
          <label htmlFor="name">name:</label>
          <input id='name' value={newName} onChange={handlechange_person} />
        </div>
        <div>
          <label htmlFor="number"> number:</label>
          <input id='number' value={newNumber} type={'number'} onChange={handlechange_number} />
        </div>
        <div>
          <button type="submit" onClick={addperson} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter updatedpersons={updatedpersons} />
    </div>
  )
}

export default App