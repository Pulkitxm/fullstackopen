import { useState,useEffect } from 'react'

import Search from './components/Search'
import PersonFrom from './components/PersonForm'
import Filter from './components/Filter'
import noteServices from './services/Notes'

const Heading = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("91");
  const [search, setSearch] = useState("");
  
  useEffect(()=>{
    // axios.get('http://localhost:3001/persons')
    noteServices
    .getAll()
    .then(response=>{
        console.log(response);
        setPersons(response);
      }
    )
  },[])

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
      const newObject = {
        name: newName,
        number: newNumber
      };
      const updatedPersons = [...persons, newObject];
      setPersons(updatedPersons);
      setNewName('');
      console.log(updatedPersons);
      // axios.post('http://localhost:3001/persons',newObject)
      noteServices
        .create(newObject)
    }
  }
  let updatedpersons = persons.filter((person) =>
    person.name && person.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <Heading text='PhoneBook' />
      <Search search={search} handlechange_search={handlechange_search} />
      <Heading text='Add a new' />
      <PersonFrom newName={newName} addperson={addperson} handlechange_person={handlechange_person} newNumber={newNumber} handlechange_number={handlechange_number} />
      <Heading text='Numbers' />
      <Filter persons={persons} setPersons={setPersons} updatedpersons={updatedpersons} />
    </div>
  )
}

export default App