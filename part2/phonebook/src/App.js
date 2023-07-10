import { useState } from 'react'

import Search from './components/Search'
import PersonFrom from './components/PersonForm'
import Filter from './components/Filter'

const Heading = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

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
      <Heading text='PhoneBook' />
      <Search search={search} handlechange_search={handlechange_search} />
      <Heading text='Add a new' />
      <PersonFrom newName={newName} addperson={addperson} handlechange_person={handlechange_person} newNumber={newNumber} handlechange_number={handlechange_number} />
      <Heading text='Numbers' />
      <Filter updatedpersons={updatedpersons} />
    </div>
  )
}

export default App