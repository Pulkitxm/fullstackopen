import React, { useState } from 'react'
import Select from 'react-select';

import { editAuthor,fetchAuthors } from '../gqlQueries'
import { useMutation, useQuery } from '@apollo/client'

const AuthorForm = () => {
  
  const [year, setyear] = useState("")
  const [selectedOption, setSelectedOption] = useState(null);

  const [alterAuthor] = useMutation(editAuthor,{
    refetchQueries:[ {quer:fetchAuthors} ]
  })

  const authors = useQuery(fetchAuthors).data.allAuthors.map(author=>({ value:author.name , label:author.name }))
  
  const handleUpdate = () => {
    alterAuthor({variables:{name:selectedOption.value,setBornTo:parseInt(year)}})
    setyear("")
  }
  
  return (
    <div>
      <h2>Set Birth year</h2>
      {/* name<input type="text" value={name} onChange={e=>setname(e.target.value)} /> */}
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={authors}
      />
      <br />
      born<input type="text" value={year} onChange={e=>setyear(e.target.value)} />
      <br />
      <br />
      <button onClick={handleUpdate} >update author</button>
    </div>
  )
}

export default AuthorForm